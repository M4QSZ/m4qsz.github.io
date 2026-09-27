use local_sync_demo::{decide_merge, MergeDecision, Record, VectorClock};

fn main() {
    let mut first = VectorClock::default();
    first.increment("pos");
    let mut second = first.clone();
    second.increment("kitchen");
    first.increment("pos");

    let local = Record {
        value: "ready".into(),
        clock: first,
    };
    let remote = Record {
        value: "cancelled".into(),
        clock: second,
    };
    let decision = decide_merge(&local, &remote);
    assert_eq!(decision, MergeDecision::Conflict);
    println!("Independent changes need a product-level resolution: {decision:?}");
}
