> **Estado:** Prototipo de investigación y Nota Técnica (v0.1). No ha sido revisada por pares ni enviada a ninguna conferencia; sirve como compañero técnico reproducible y base para trabajo futuro en SAT / verificación formal.

---

## Resumen

Los *miters* de equivalencia aritmética heterogéneos (por ejemplo, comparar un multiplicador *schoolbook*/ripple contra uno de árbol de Wallace) y las combinaciones disyuntivas de restricciones de palomar y paridad con cables eliminados son un cuello de botella serio para los solvers CDCL (*Conflict-Driven Clause Learning*) cuando se presentan como fórmulas 3-CNF planas, con variables y polaridades permutadas. Por su parte, los verificadores algebraicos de multiplicadores suelen operar sobre grafos AND-Inverter (AIG) y emiten pruebas en cálculos algebraicos (`PAC`/`LPAC`), separados de los verificadores de pruebas pseudo-booleanas.

Esta nota técnica documenta un prototipo de preprocesamiento y refutación que opera directamente sobre fórmulas 3-CNF anónimas:

1. **Extracción ciega de sumadores aritméticos y certificación `VeriPB 3.0`:** recupera compuertas deterministas de 2 entradas bajo permutaciones y cambios de fase arbitrarios, fusiona salidas congruentes, sintetiza ecuaciones enteras de semisumador y de sumador completo con acarreo disjunto mediante *Reverse Unit Propagation* (RUP) con cubos acotados y división de planos de corte, elimina acarreos internos con una sola pasada RREF racional dispersa, y registra pruebas `VeriPB 3.0` verificadas por máquina para refutaciones por *bit-peeling* 2-ádico/GCD.
2. **Síntesis de aniquiladores duales de Reed–Muller y Macaulay disperso / planos de corte acoplados:** identifica definiciones no lineales ocultas elevando conjuntos locales de falsificación a coordenadas de Reed–Muller de grado $d$, $\mathrm{RM}(d, n)$, con aislamiento de derivadas booleanas direccionales en $O(|V|\cdot \dim^2)$, y acopla colisiones de diamante de ancho 3, ideales de pétalo de 4 variables, RREF dispersa sobre $\mathbb{F}_2$ y planos de corte monótonos con guardas (cliques y acarreo de pares).

En *miters* `Schoolbook vs Wallace` con variables permutadas (`6x6` a `16x16` bits), `veripb 3.0.2` valida cada prueba `.pbp` generada en `37.2 ms`–`400.9 ms`. En una comparación de 300 s de reloj contra `Kissat 4.0.4` y `CryptoMiniSat 5`, nuestro prototipo en Python resuelve *miters* de multiplicador `12x12`–`20x20` permutados (`6.7 s`–`27.8 s`) donde ambos solvers en C/C++ agotan el tiempo a `300 s`, y resuelve un interpolante `PHP_{13}^{12} \vee \mathrm{Tseitin}_{28}` con cables eliminados `73x` más rápido que `Kissat 4.0.4` (`2.87 s` vs `209.75 s`).

---

## 1. Trabajo relacionado y posicionamiento

* **Clausal Congruence Closure:** Biere, Fazekas, Fleury y Froleyks [1] (*SAT 2024*, integrado en `Kissat 4.0.4`) recuperan compuertas `AND`, `XOR` e `ITE` directamente desde CNF y fusionan salidas estructuralmente equivalentes. En multiplicadores heterogéneos (`Schoolbook vs Wallace`), los árboles internos de reducción de productos parciales difieren estructuralmente, de modo que no quedan compuertas internas equivalentes que fusionar a nivel de cláusulas antes de la ramificación exponencial.
* **Verificación algebraica de multiplicadores:** Kaufmann y Biere [2] (*AMulet 2.0*, *TACAS 2021*) verifican multiplicadores a nivel de compuertas mediante reescritura con bases de Gröbner y sustitución de sumadores sobre AIG, con registro de pruebas algebraicas `PAC`. Nuestro prototipo complementa esta línea operando directamente sobre 3-CNF permutada (sin entradas AIG) y registrando las refutaciones directamente en formato de planos de corte `VeriPB 3.0`.
* **Certificación pseudo-booleana y de paridad:** Gocht y Nordström [3] (*AAAI 2021*) introdujeron la certificación eficiente de paridad en `VeriPB` con variables de extensión, y Koops et al. [4] (*CP 2025*) demostraron registro práctico de pruebas LP/Farkas y planos de corte para optimización pseudo-booleana (`RoundingSat` / `Sat4j` + `VeriPB` / `CakePB`).
* **Recodificación sintáctica con variables auxiliares:** Haberlandt, Green y Heule [5] (*SBVA*, *SAT 2023*) estabilizan la *Bounded Variable Addition* con desempates estructurados sobre patrones de bicliques de cláusulas, mientras que nuestra síntesis de aniquiladores duales apunta a restricciones locales no lineales cuyos patrones de cláusulas carecen de bicliques cartesianos limpios.

---

## 2. Descripción del pipeline

### 2.1 Pseudocódigo de extracción de sumadores `3-CNF -> VeriPB 3.0` (`veripb_emitter.py`)

```text
Entrada: 3-CNF DIMACS anónima (n_vars, m cláusulas)
1. Repetir hasta punto fijo:
     a) Aplicar propagación unitaria, resolución binaria unitaria y equivalencias 2-XOR (`rup` + sync).
     b) Escanear tripletas de 3 variables buscando compuertas deterministas de 2 entradas o = g(u, w).
     c) Fusionar salidas de compuertas congruentes (o1 == +/- o2) con RUP de cubo de 2 variables (`pol ... 2 d`).
2. Extraer ecuaciones aritméticas en Z a partir de las compuertas residuales:
     a) Pares de semisumador (u, w) -> (s, c): derivar u + w - s - 2c = 0 con 7 cláusulas RUP de cubo acotado + `d`.
     b) Compuertas OR de sumador completo con acarreo disjunto (c1, c2) -> cout con !(c1 & c2): derivar c1 + c2 - cout = 0.
3. Una sola RREF racional dispersa sobre Q (priorizando cables internos con occ >= 2 como pivotes):
     Seguir las combinaciones lineales racionales exactas `lambda_e` sobre las ecuaciones base.
4. *Bit-peeling* incremental 2-ádico / GCD sobre filas pivote de bajo soporte:
     Limpiar denominadores -> calcular g = gcd(coeficientes).
     - Si g > 1 y g no divide el lado derecho:
         Emitir `pol <comb_ge> <g> d`, `pol <comb_le> <g> d`, y la suma -> `0 >= 1` (`veripb` UNSAT).
     - Si no, si quedan 1 o 2 coeficientes impares:
         Derivar la unidad o 2-XOR implicada con `pol ... + 2 d` y propagar hasta la contradicción.
Salida: prueba `.pbp` completa que termina en `output NONE ; conclusion UNSAT : <cid> ;`
```

### 2.2 Síntesis de aniquiladores duales de Reed–Muller (`veronese_annihilator.py`)

Para bloques locales de cláusulas no lineales con soporte $U$ ($|U| \le 12$), sea $F_{\mathrm{bad}} \subseteq \{0,1\}^{|U|}$ el conjunto de puntos falsificados de la tabla de verdad. Al elevar $F_{\mathrm{bad}}$ a la base de coordenadas de Reed–Muller / Veronese de grado $d$, $\nu_d$, e intersectar aniquiladores duales proyectados mediante eliminación de Zassenhaus a nivel de bits, se obtienen subespacios polinomiales candidatos. Cuando una definición cuasi-lineal $q = P(z \setminus \{u\}) \oplus u$ queda oculta por múltiplos de sicigias $f \cdot q$, su derivada booleana direccional cumple $\Delta_u(f \cdot q) = f$ de forma idéntica; proyectar fuera los monomios de grado $\ge 2$ que contienen $u$ impone $\Delta_u P \equiv 1$ y aísla $P = q$ en $O(|V| \cdot \dim^2)$ operaciones, sin enumeración $2^{\dim}$.

### 2.3 Macaulay disperso acoplado y planos de corte con guardas (`macaulay_cp.py`)

Dos 3-cláusulas distintas sobre la misma tripleta de variables comparten el mismo monomio cúbico líder $x_1 x_2 x_3$ en $\mathbb{F}_2[x_1, x_2, x_3]/(x_i^2 - x_i)$, por lo que su diferencia cancela el término cúbico y produce una ecuación cuadrática exacta en $\mathrm{RM}(2, 3)$. Nuestro lazo híbrido acopla resolución de diamante de ancho 3 priorizada por colisiones, ideales de anulación de pétalos de 4 variables y RREF dispersa $O(\mathrm{nnz})$ sobre $\mathbb{F}_2$, con hiperplanos modulares monótonos ($\mathbb{F}_2, \mathbb{F}_3, \mathbb{F}_5$), planos de corte de cliques con guardas, redondeo LP de acarreo de pares/2-XOR y descomposición por cortes de vértices primales para fórmulas disyuntivas con cables eliminados.

### 2.4 Alcance de la verificación en dos capas

* **Solidez finita de reglas (`proofs/rule_soundness.lean`):** 30 teoremas verificados en Lean 4.36.0 (`decide +revert`, `0` axiomas externos, `0 sorryAx`) confirman la validez booleana/entera finita exacta de las identidades locales de reescritura algebraica y de planos de corte.
* **Certificación extremo a extremo por instancia (`veripb 3.0.2`):** como el solver en Python y el motor RREF disperso no están formalizados en Lean, cada refutación de *miter* aritmético se verifica de forma independiente, desde el `.cnf` DIMACS original, con el verificador externo en Rust `veripb 3.0.2`.

---

## 3. Evaluación experimental (presupuesto de 300 s de reloj)

Todos los experimentos se ejecutaron en una máquina Linux de 4 núcleos (`Python 3.12`, `numpy`, `scipy` HiGHS, `python-sat`, `pycryptosat`, `Kissat 4.0.4` compilado con `-O3`, `veripb 3.0.2`). Todos los benchmarks se generaron sintéticamente y se sometieron a permutación aleatoria de variables, inversión de polaridad y mezcla de cláusulas antes de resolverlos.

### Tabla 1: certificación extremo a extremo con `VeriPB 3.0.2` (miters `Schoolbook vs Wallace` en 3-CNF permutada)

| Instancia permutada | Vars | Cláusulas | Líneas `.pbp` | Resolver + emitir (Python) | Verificación `veripb 3.0.2` | Veredicto |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `Scrambled_Miter_06x06` | `369` | `1,174` | `6,135` | `532.4 ms` | **`37.2 ms`** | `s VERIFIED UNSATISFIABLE` |
| `Scrambled_Miter_08x08` | `685` | `2,206` | `11,872` | `1,641.2 ms` | **`43.9 ms`** | `s VERIFIED UNSATISFIABLE` |
| `Scrambled_Miter_10x10` | `1,097` | `3,558` | `19,406` | `3,524.4 ms` | **`87.8 ms`** | `s VERIFIED UNSATISFIABLE` |
| `Scrambled_Miter_12x12` | `1,605` | `5,230` | `28,793` | `6,483.2 ms` | **`213.8 ms`** | `s VERIFIED UNSATISFIABLE` |
| `Scrambled_Miter_16x16` | `2,909` | `9,534` | `53,042` | `28,230.8 ms` | **`400.9 ms`** | `s VERIFIED UNSATISFIABLE` |

### Tabla 2: comparación de 300 s de reloj contra `Kissat 4.0.4` y `CryptoMiniSat 5`

| Benchmark permutado (`.cnf`) | Vars / Cláusulas | Nuestro (Python, 0 ramas) | `Kissat 4.0.4` (C, `-O3`) | `CryptoMiniSat 5` (C++) | `RoundingSat` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `Miter_Mult_12x12_Scrambled` | `1,605 / 5,230` | **`UNSAT` (`6,722.8 ms`)** | `TIMEOUT_300s` | `TIMEOUT_300s` | `N/A` |
| `Miter_Mult_16x16_Scrambled` | `2,909 / 9,534` | **`UNSAT` (`12,999.4 ms`)** | `TIMEOUT_300s` | `TIMEOUT_300s` | `N/A` |
| `Miter_Mult_20x20_Scrambled` | `4,597 / 15,118` | **`UNSAT` (`27,786.8 ms`)** | `TIMEOUT_300s` | `TIMEOUT_300s` | `N/A` |
| `WireElim_OR_s1s2_PHP13_12_Tseitin28` | `3,157 / 5,196` | **`UNSAT` (`2,874.7 ms`)** | `UNSAT` (`209,745.2 ms`) | `TIMEOUT_300s` | `N/A` |
| `Lifted_PHP65_o_Keccak4L_Scrambled` | `17,373 / 21,284` | `UNSAT` (`3,885.2 ms`) | **`UNSAT` (`151.6 ms`)** | `UNSAT` (`213.4 ms`) | `N/A` |
| `Shifted_Cubic_Sponge_Miter_Scrambled` | `2,615 / 3,264` | `UNSAT` (`235.3 ms`) | **`UNSAT` (`144.7 ms`)** | `UNSAT` (`252.7 ms`) | `N/A` |
| `Goldreich_XORMAJ3_n28_m36_Scrambled` | `1,180 / 1,728` | `FEASIBLE` *(tope)* | **`UNSAT` (`51.5 ms`)** | `UNSAT` (`116.4 ms`) | `N/A` |

---

## 4. Limitaciones y transparencia

1. **Solo benchmarks sintéticos:** todos los benchmarks de las Tablas 1 y 2 provienen de los generadores sintéticos de `benchmarks.py`. La evaluación sobre benchmarks externos de la SAT Competition o de miters de hardware industrial queda como trabajo futuro.
2. **Donde ganan los solvers CDCL nativos en C:** en núcleos de palomar elevados más pequeños (`PHP_6^5`), miters cúbicos de anillo pequeños y `Goldreich XOR-MAJ3` con $n=28$ (donde nuestro pre-paso desenrollado `(1,1)` llega a su tope `max_active_vars=48` y el lazo externo omite circuitos de más de 500 variables), `Kissat 4.0.4` y `CryptoMiniSat 5` resuelven las instancias en `51`–`253 ms`. Esto motiva posicionar nuestro motor como **preprocesador certificado de vía rápida / componente de portafolio** previo al CDCL, y no como reemplazo independiente.
3. **Disponibilidad de `RoundingSat`:** no se pudo compilar `RoundingSat` en este entorno por falta de `cmake` y `Boost >= 1.70`; `benchmark_solvers.py` admite `--roundingsat-bin` cuando está instalado.
4. **Alcance de `rule_soundness.lean` frente a `VeriPB`:** los 30 teoremas de Lean 4 verifican reglas locales finitas de reescritura mediante `decide +revert`, no la corrección asintótica $\forall n$ de la implementación en Python; la solidez de la refutación extremo a extremo la garantiza, instancia por instancia, `veripb 3.0.2`.
5. **Observación a pequeña escala en 3-SAT aleatorio:** en ejecuciones exploratorias anteriores sobre 3-SAT aleatorio UNSAT ($\alpha = 6.2$, $n=64$), acoplar Macaulay disperso de grado 3 con planos de corte con guardas produjo `8/8` refutaciones sin ramificación (`13.6 s`), donde cada componente por separado logró `0/8` (`16/16` chequeos SAT superados). Se anota estrictamente como observación empírica de $n$ pequeño; el CDCL estándar resuelve $n=64$ en milisegundos y las cotas inferiores asintóticas de expansión aplican al crecer $n$.
6. **Nota de desarrollo asistido por IA:** este prototipo de investigación, la suite de solidez de reglas en Lean 4 y la documentación se desarrollaron con flujos de programación y búsqueda asistidos por IA, y se verificaron directamente mediante la ejecución local de `lean`, `veripb 3.0.2`, `kissat 4.0.4` y `pycryptosat`.

---

## 5. Comandos portables de reproducibilidad

```bash
# 1. Verificar las 30 reglas locales finitas de reescritura en Lean 4 (0 axiomas)
lean proofs/rule_soundness.lean

# 2. Emitir y verificar pruebas VeriPB 3.0.2 para miters de multiplicador permutados 6x6..16x16
uv run --with-editable . python -m certified_arith_preproc.veripb_emitter --bits 6 8 10 12 16

# 3. Ejecutar la comparación de 300 s contra Kissat 4.0.4 y CryptoMiniSat 5
uv run --with-editable '.[benchmarks]' python -m certified_arith_preproc.benchmark_solvers --timeout 300

# O ejecutar los tres pasos con:
./scripts/reproduce.sh --timeout 300
```

---

## Referencias

1. Armin Biere, Katalin Fazekas, Mathias Fleury y Nils Froleyks. *Clausal Congruence Closure*. 27th International Conference on Theory and Applications of Satisfiability Testing (SAT 2024), LIPIcs Vol. 305, pp. 6:1–6:25. DOI: `10.4230/LIPIcs.SAT.2024.6`.
2. Daniela Kaufmann y Armin Biere. *AMulet 2.0 for Verifying Multiplier Circuits*. Tools and Algorithms for the Construction and Analysis of Systems (TACAS 2021), LNCS, pp. 357–364. DOI: `10.1007/978-3-030-72013-1_19`.
3. Stephan Gocht y Jakob Nordström. *Certifying Parity Reasoning Efficiently Using Pseudo-Boolean Proofs*. Proceedings of the AAAI Conference on Artificial Intelligence (AAAI 2021), Vol. 35(5), pp. 3768–3777. DOI: `10.1609/aaai.v35i5.16494`.
4. Wietze Koops, Daniel Le Berre, Magnus O. Myreen, Jakob Nordström, Andy Oertel, Yong Kiam Tan y Marc Vinyals. *Practically Feasible Proof Logging for Pseudo-Boolean Optimization*. 31st International Conference on Principles and Practice of Constraint Programming (CP 2025), LIPIcs, Art. 21. DOI: `10.4230/LIPIcs.CP.2025.21`.
5. Andrew Haberlandt, Harrison Green y Marijn J. H. Heule. *Effective Auxiliary Variables via Structured Reencoding*. 26th International Conference on Theory and Applications of Satisfiability Testing (SAT 2023), LIPIcs, Art. 11. DOI: `10.4230/LIPIcs.SAT.2023.11`.
