# Local sync primitives in Rust

A small, independent example of two concepts used in systems that work offline:

1. **Vector clocks** distinguish an older update from a concurrent update. Concurrent changes are reported as conflicts instead of silently overwriting either side.
2. **An outbox** retains operations until acknowledged. Repeated batch reads return the same operations, making retry behavior explicit. Event IDs prevent duplicate enqueues in the current process.

This code does not come from Meson and contains no product logic or private data. It is a focused demonstration, **not a production sync engine**: it has no disk persistence, network transport, authentication, encryption or automatic conflict policy. A real implementation must persist both pending operations and acknowledged IDs across restarts, validate incoming events, and test failure recovery end to end.

## Run

```bash
cargo test
cargo run --example demo
```

Rust stable is sufficient; the crate has no external dependencies.

## Design notes

- A clock `A:2, B:1` is newer than `A:1, B:1`.
- Clocks `A:2, B:1` and `A:1, B:2` are concurrent. The caller must resolve that conflict according to product rules.
- `batch()` does not remove operations. Only `ack()` does, after a confirmed remote result.
- This example deduplicates by `(actor, sequence)` within one process. Durable deduplication requires persistent state.
