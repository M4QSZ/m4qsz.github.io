use std::collections::{BTreeMap, BTreeSet, VecDeque};

#[derive(Clone, Debug, Default, Eq, PartialEq)]
pub struct VectorClock(BTreeMap<String, u64>);

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Order {
    Before,
    After,
    Equal,
    Concurrent,
}

impl VectorClock {
    pub fn increment(&mut self, actor: &str) -> u64 {
        let counter = self.0.entry(actor.to_owned()).or_default();
        *counter += 1;
        *counter
    }

    pub fn get(&self, actor: &str) -> u64 {
        self.0.get(actor).copied().unwrap_or(0)
    }

    pub fn join(&mut self, other: &Self) {
        for (actor, count) in &other.0 {
            let current = self.0.entry(actor.clone()).or_default();
            *current = (*current).max(*count);
        }
    }

    pub fn compare(&self, other: &Self) -> Order {
        let actors: BTreeSet<_> = self.0.keys().chain(other.0.keys()).collect();
        let mut less = false;
        let mut greater = false;
        for actor in actors {
            let left = self.get(actor);
            let right = other.get(actor);
            less |= left < right;
            greater |= left > right;
            if less && greater {
                return Order::Concurrent;
            }
        }
        match (less, greater) {
            (true, false) => Order::Before,
            (false, true) => Order::After,
            (false, false) => Order::Equal,
            (true, true) => unreachable!(),
        }
    }
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Record {
    pub value: String,
    pub clock: VectorClock,
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum MergeDecision {
    KeepLocal,
    UseRemote,
    Same,
    Conflict,
}

pub fn decide_merge(local: &Record, remote: &Record) -> MergeDecision {
    match local.clock.compare(&remote.clock) {
        Order::Before => MergeDecision::UseRemote,
        Order::After => MergeDecision::KeepLocal,
        Order::Concurrent => MergeDecision::Conflict,
        Order::Equal if local.value == remote.value => MergeDecision::Same,
        Order::Equal => MergeDecision::Conflict,
    }
}

#[derive(Clone, Debug, Eq, Ord, PartialEq, PartialOrd)]
pub struct EventId {
    pub actor: String,
    pub sequence: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Operation {
    pub id: EventId,
    pub entity: String,
    pub value: String,
    pub clock: VectorClock,
}

#[derive(Default)]
pub struct Outbox {
    pending: VecDeque<Operation>,
    seen: BTreeSet<EventId>,
}

impl Outbox {
    pub fn enqueue(&mut self, operation: Operation) -> bool {
        if operation.id.actor.is_empty() || operation.id.sequence == 0 {
            return false;
        }
        if !self.seen.insert(operation.id.clone()) {
            return false;
        }
        self.pending.push_back(operation);
        true
    }

    pub fn batch(&self, limit: usize) -> Vec<Operation> {
        self.pending.iter().take(limit).cloned().collect()
    }

    pub fn ack(&mut self, id: &EventId) -> bool {
        let Some(index) = self.pending.iter().position(|item| &item.id == id) else {
            return false;
        };
        self.pending.remove(index);
        true
    }

    pub fn pending_count(&self) -> usize {
        self.pending.len()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn record(value: &str, clock: VectorClock) -> Record {
        Record {
            value: value.into(),
            clock,
        }
    }

    #[test]
    fn vector_clock_detects_causal_and_concurrent_updates() {
        let mut original = VectorClock::default();
        original.increment("device-a");
        let mut later = original.clone();
        later.increment("device-a");
        assert_eq!(original.compare(&later), Order::Before);
        assert_eq!(later.compare(&original), Order::After);

        let mut concurrent = original.clone();
        concurrent.increment("device-b");
        assert_eq!(later.compare(&concurrent), Order::Concurrent);
        assert_eq!(concurrent.compare(&later), Order::Concurrent);
    }

    #[test]
    fn join_records_observed_changes() {
        let mut left = VectorClock::default();
        left.increment("device-a");
        let mut right = VectorClock::default();
        right.increment("device-b");
        left.join(&right);
        assert_eq!(left.get("device-a"), 1);
        assert_eq!(left.get("device-b"), 1);
        assert_eq!(left.compare(&right), Order::After);
    }

    #[test]
    fn equal_clocks_with_different_values_are_conflicts() {
        let mut clock = VectorClock::default();
        clock.increment("device-a");
        assert_eq!(
            decide_merge(&record("one", clock.clone()), &record("two", clock)),
            MergeDecision::Conflict
        );
    }

    #[test]
    fn outbox_retries_until_ack_and_rejects_duplicates() {
        let id = EventId {
            actor: "device-a".into(),
            sequence: 1,
        };
        let operation = Operation {
            id: id.clone(),
            entity: "example-1".into(),
            value: "updated".into(),
            clock: VectorClock::default(),
        };
        let mut outbox = Outbox::default();
        assert!(outbox.enqueue(operation.clone()));
        assert!(!outbox.enqueue(operation.clone()));
        assert_eq!(outbox.batch(1), vec![operation.clone()]);
        assert_eq!(outbox.batch(1), vec![operation.clone()]);
        assert!(outbox.ack(&id));
        assert!(!outbox.ack(&id));
        assert!(!outbox.enqueue(operation));
        assert_eq!(outbox.pending_count(), 0);
    }

    #[test]
    fn outbox_respects_order_and_batch_limit() {
        let mut outbox = Outbox::default();
        for sequence in 1..=3 {
            assert!(outbox.enqueue(Operation {
                id: EventId {
                    actor: "device-a".into(),
                    sequence
                },
                entity: "example".into(),
                value: sequence.to_string(),
                clock: VectorClock::default()
            }));
        }
        assert_eq!(
            outbox
                .batch(2)
                .iter()
                .map(|item| item.id.sequence)
                .collect::<Vec<_>>(),
            vec![1, 2]
        );
        assert_eq!(outbox.pending_count(), 3);
    }
}
