; FNV-1a 64-bit. Windows x64 ABI: bytes in RCX, length in RDX,
; result in RAX. Only volatile registers are modified.
default rel
section .text
global fnv1a_asm

fnv1a_asm:
    mov rax, 0xcbf29ce484222325
    mov r8, 0x100000001b3
    test rdx, rdx
    jz .done
.next:
    movzx r9, byte [rcx]
    xor rax, r9
    imul rax, r8
    inc rcx
    dec rdx
    jnz .next
.done:
    ret
