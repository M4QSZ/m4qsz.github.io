# C++17: bounded offline outbox

An independent in-memory outbox with capacity limits, idempotent message IDs, acknowledgment and bounded exponential retry delay. The tests cover duplicate IDs, capacity, retry timing, acknowledgment and timestamp overflow.

```powershell
g++ -std=c++17 -Wall -Wextra -Werror -pedantic outbox.cpp test.cpp -o outbox_test.exe
.\outbox_test.exe
```

This is a teaching sample. It has no disk persistence, transport, encryption or multi-thread synchronization, and is not copied from Meson.
