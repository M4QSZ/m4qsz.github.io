# C + x86-64 Assembly: FNV-1a

Independent demonstration of a C ABI boundary. Both implementations calculate the same 64-bit FNV-1a hash for arbitrary bytes, including zero bytes. The assembly version targets the **Windows x64 ABI** and uses only volatile registers. This is a noncryptographic hash: do not use it for passwords, authentication, or tamper protection.

On Windows with GCC and NASM:

```powershell
nasm -f win64 fnv_win64.asm -o fnv_win64.obj
gcc -std=c11 -Wall -Wextra -Werror fnv.c test.c fnv_win64.obj -o fnv_test.exe
.\fnv_test.exe
```

The test checks known vectors and compares both implementations on binary and longer inputs. This sample contains no Meson code.
