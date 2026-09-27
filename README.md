# Miguel Antonio Quevedo Simoza — portfolio de ingeniería de software

Portafolio estático en **Astro**, disponible en español e inglés. Presenta productos y decisiones técnicas en Flutter, Dart, Rust, Next.js y Astro mediante casos de estudio. Meson, el proyecto principal, conserva su código fuente y sus datos en un repositorio privado.

## Contenido

- **Meson:** apps de negocio, clientes con comunidad social y reparto; red local P2P, editor visual de mesas, shell y Store interna de módulos.
- **Comercio web:** proyecto independiente en Next.js, React, TypeScript y Supabase. El checkout actual es una demostración.
- **Dos proyectos Astro:** un sitio de servicios y un prototipo QR/NFC de identificación de emergencia. El prototipo requiere validación de seguridad, privacidad y operación antes de cualquier uso real.
- **Laboratorio:** muestras independientes en Rust, C, ensamblador x86-64, C++, Swift y PHP. Las pruebas de Rust, C/ensamblador, C++ y PHP se ejecutaron localmente; Swift sigue pendiente de ejecutar en un equipo con sus herramientas.

Los diagramas y gráficos del portafolio son ilustraciones conceptuales. Los casos describen implementación revisada en código; no atribuyen métricas, usuarios ni resultados comerciales sin evidencia.

## Ejecutar el sitio

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

```bash
npm run build
npm run check:public
```

`check:public` comprueba rutas internas, idioma HTML y algunos patrones de datos sensibles en la salida estática. Es una revisión automatizada limitada.

## Muestras de código

```bash
cd samples/local-sync-rust
cargo test
cargo run --example demo
```

El ejemplo usa únicamente la biblioteca estándar de Rust. Explica los límites de la implementación en su propio [README](samples/local-sync-rust/README.md).

Las demás muestras tienen instrucciones en sus carpetas: [C y ensamblador](samples/fnv-c-asm/README.md), [C++](samples/outbox-cpp/README.md), [Swift](samples/offline-outbox-swift/README.md) y [PHP](samples/order-quote-php/README.md). La muestra PHP usa PHP puro y no se presenta como experiencia demostrada en Laravel.

## Estructura

- `src/data/profile.ts`: datos de contacto y tarjetas de proyectos en español.
- `src/data/english.ts`: resúmenes y casos en inglés.
- `src/pages/`: páginas del portafolio y casos de estudio.
- `samples/`: cinco muestras de código independientes, cada una con alcance y verificación documentados.
- `scripts/check-public.mjs`: comprobación local de salida estática.

El sitio no contiene código ni recursos copiados de los productos privados. No incluye formularios que recojan datos.
