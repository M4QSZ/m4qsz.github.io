#include "fnv.h"

#include <assert.h>
#include <stdio.h>
#include <string.h>

static void check(const uint8_t *bytes, size_t length, uint64_t expected) {
    assert(fnv1a_c(bytes, length) == expected);
    assert(fnv1a_asm(bytes, length) == expected);
}

int main(void) {
    check(NULL, 0, UINT64_C(0xcbf29ce484222325));
    check((const uint8_t *)"a", 1, UINT64_C(0xaf63dc4c8601ec8c));
    check((const uint8_t *)"hello", 5, UINT64_C(0xa430d84680aabd0b));

    const uint8_t binary[] = {0, 255, 1, 0, 42};
    check(binary, sizeof binary, fnv1a_c(binary, sizeof binary));

    uint8_t longer[4096];
    for (size_t i = 0; i < sizeof longer; ++i) longer[i] = (uint8_t)i;
    check(longer, sizeof longer, fnv1a_c(longer, sizeof longer));

    puts("C and Assembly FNV-1a agree on five cases.");
    return 0;
}
