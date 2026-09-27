#ifndef FNV_H
#define FNV_H

#include <stddef.h>
#include <stdint.h>

uint64_t fnv1a_c(const uint8_t *bytes, size_t length);
uint64_t fnv1a_asm(const uint8_t *bytes, size_t length);

#endif
