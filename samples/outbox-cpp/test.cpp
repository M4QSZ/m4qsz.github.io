#include "outbox.hpp"

#include <cassert>
#include <cstdint>
#include <iostream>
#include <stdexcept>

int main() {
    Outbox queue{2};
    assert(queue.enqueue("a", "first"));
    assert(!queue.enqueue("a", "duplicate"));
    assert(queue.enqueue("b", "second"));
    assert(!queue.enqueue("c", "full"));
    assert(queue.size() == 2);

    assert(queue.due(0).size() == 2);
    assert(queue.record_attempt("a", 100));
    assert(queue.due(1099).size() == 1);
    assert(queue.due(1100).size() == 2);
    assert(queue.record_attempt("a", 1100));
    assert(queue.due(3099).size() == 1);
    assert(queue.due(3100).size() == 2);

    assert(queue.acknowledge("a"));
    assert(!queue.acknowledge("a"));
    assert(queue.enqueue("c", "now there is room"));

    bool rejected_zero_capacity = false;
    try { Outbox invalid{0}; } catch (const std::invalid_argument&) { rejected_zero_capacity = true; }
    assert(rejected_zero_capacity);

    Outbox overflow{1};
    assert(overflow.enqueue("max", "boundary"));
    assert(overflow.record_attempt("max", UINT64_MAX - 5));
    assert(overflow.due(UINT64_MAX - 1).empty());
    assert(overflow.due(UINT64_MAX).size() == 1);

    std::cout << "C++ outbox cases passed.\n";
}
