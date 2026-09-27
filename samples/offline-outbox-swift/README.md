# Swift: offline outbox and route choice

Small Swift Package showing value types, a pending-operation queue, duplicate protection, acknowledgement and route selection. It prefers a local route when available and keeps work pending while disconnected. It contains no networking, persistence or security layer.

```text
swift test
```

**Verification pending:** Swift is not installed in the current Windows environment, so these XCTest cases have not been run here. Run them on a host with Swift before using this as evidence of Swift proficiency. The sample is independent of Meson.
