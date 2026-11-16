export const profile = {
  name: 'Miguel Antonio Quevedo Simoza',
  shortName: 'Miguel Quevedo',
  role: 'Ingeniero de software multiplataforma · PC, móvil, web, Rust y videojuegos',
  headline: 'Diseño productos multiplataforma (PC, móvil y web) con Flutter, Dart y Rust, además de videojuegos en Unity (C#) y sistemas web con Next.js y Astro.',
  github: 'https://github.com/M4QSZ',
  linkedin: 'https://www.linkedin.com/in/miguel-quevedo-dev/',
  email: 'miguel.270799@gmail.com',
  location: 'Estado Aragua, Venezuela · Remoto · Híbrido · Presencial',
  locationEn: 'Estado Aragua, Venezuela · Remote · Hybrid · On-site',
  availability: 'Remoto · Híbrido · Presencial · Reubicación',
};

export type ProjectVariant =
  | 'screenshot'
  | 'p2p'
  | 'modules'
  | 'mobile-clients'
  | 'mobile-delivery'
  | 'roblox'
  | 'ai-bevy';

export interface ProjectItem {
  number: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  href: string;
  accent: string;
  variant: ProjectVariant;
  image?: string;
  secondaryImage?: string;
  imageAlt?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const publicCrates = [
  {
    slug: 'lan-delta-sync',
    repo: 'https://github.com/M4QSZ/lan-delta-sync',
    ciUrl: 'https://github.com/M4QSZ/lan-delta-sync/actions',
    stack: ['Rust', 'ChaCha20-Poly1305', 'HLC / CRDT', 'CI Linux + Windows'],
    es: {
      eyebrow: '01 / CRATE RUST · CI VERDE',
      title: 'lan-delta-sync',
      lead: 'Implementación limpia en Rust de reloj lógico híbrido (HLC), mapa CRDT LWW con tombstones, framing cifrado AEAD anti-replay y outbox con backoff exponencial.',
      status: '7 tests de integración + ejemplo CLI en verde (Ubuntu & Windows)',
    },
    en: {
      eyebrow: '01 / RUST CRATE · GREEN CI',
      title: 'lan-delta-sync',
      lead: 'Clean-room Rust implementation of a Hybrid Logical Clock (HLC), LWW map CRDT with tombstones, anti-replay ChaCha20-Poly1305 framing and bounded retry outbox.',
      status: '7 integration tests + CLI simulation green (Ubuntu & Windows)',
    },
  },
  {
    slug: 'ffi-arena-bridge',
    repo: 'https://github.com/M4QSZ/ffi-arena-bridge',
    ciUrl: 'https://github.com/M4QSZ/ffi-arena-bridge/actions',
    stack: ['Rust', 'C99 ABI', 'dart:ffi', 'CI + cdylib Smoke'],
    es: {
      eyebrow: '02 / CRATE RUST + FFI · CI VERDE',
      title: 'ffi-arena-bridge',
      lead: 'Puente C-ABI y dart:ffi sin dependencias externas con handles generacionales u64, protección anti-pánico (catch_unwind), liberación segura contra double-free e índice de trigramas.',
      status: '3 tests Rust + prueba C99 enlazada contra cdylib en verde',
    },
    en: {
      eyebrow: '02 / RUST + FFI CRATE · GREEN CI',
      title: 'ffi-arena-bridge',
      lead: 'Zero-dependency C-ABI and dart:ffi bridge with u64 generational handles, panic-shield boundary (catch_unwind), double-free-safe buffers and deterministic trigram indexing.',
      status: '3 Rust tests + live C99 cdylib smoke binary green',
    },
  },
  {
    slug: 'dart-offline-outbox',
    repo: 'https://github.com/M4QSZ/dart-offline-outbox',
    ciUrl: 'https://github.com/M4QSZ/dart-offline-outbox/actions',
    stack: ['Dart 3', 'Offline-First', 'Outbox Pattern', 'CI Linux + Windows'],
    es: {
      eyebrow: '03 / PAQUETE DART · CI VERDE',
      title: 'dart-offline-outbox',
      lead: 'Outbox transaccional offline-first en Dart puro con coalescencia de escrituras por entidad, backoff exponencial con jitter, ACK parcial por lote y cuarentena de fallos permanentes.',
      status: '4 tests unitarios + analyze estrictos en verde (Ubuntu & Windows)',
    },
    en: {
      eyebrow: '03 / DART PACKAGE · GREEN CI',
      title: 'dart-offline-outbox',
      lead: 'Pure-Dart transactional offline-first outbox with per-entity write coalescing, jittered exponential backoff, partial batch ACKs and deterministic dead-letter quarantine.',
      status: '4 unit tests + strict analyzer green (Ubuntu & Windows)',
    },
  },
];

export const projects: ProjectItem[] = [
  {
    number: '01',
    title: 'Meson',
    type: 'Ecosistema privado · PC, móvil y web',
    description: 'Suite multiplataforma con negocio/ERP, HR y nómina (Atelier), control central financiero, clientes, reparto mesh, 8 crates Rust nativos y web Astro.',
    stack: ['Flutter', 'Dart', 'Rust', 'Kotlin'],
    href: '/proyectos/meson/',
    accent: 'orange',
    variant: 'screenshot',
    image: '/images/meson-shell.webp',
    secondaryImage: '/images/meson-web-devices.webp',
    imageAlt: 'Captura actual del escritorio de Meson con lanzador de módulos y panel Phone Link',
    repoUrl: 'https://github.com/M4QSZ/ffi-arena-bridge',
  },
  {
    number: '02',
    title: 'Red local P2P',
    type: 'Subsistema de Meson · arquitectura',
    description: 'Descubrimiento entre dispositivos, mensajes cifrados y una ruta de sincronización que sigue funcionando sin Internet.',
    stack: ['Rust', 'LAN', 'UDP/TCP', 'AES-GCM'],
    href: '/proyectos/red-p2p/',
    accent: 'blue',
    variant: 'p2p',
    repoUrl: 'https://github.com/M4QSZ/lan-delta-sync',
  },
  {
    number: '03',
    title: 'Editor visual de mesas',
    type: 'Subsistema de Meson · interfaz',
    description: 'Plano interactivo con mesas, zonas, asientos y vistas 2D e isométricas, construido con Flutter y Flame.',
    stack: ['Flutter', 'Flame', 'Dart', 'UI'],
    href: '/proyectos/editor-mesas/',
    accent: 'teal',
    variant: 'screenshot',
    image: '/images/meson-floor-editor.webp',
    secondaryImage: '/images/meson-shell.webp',
    imageAlt: 'Captura actual del editor isométrico de mesas de Meson mostrando Pisos 1 y 2',
  },
  {
    number: '04',
    title: 'Shell personalizable',
    type: 'Subsistema de Meson · experiencia de escritorio',
    description: 'Ventanas internas, escritorios, barra de tareas, acoplamiento y ajustes visuales persistentes para una estación de trabajo adaptable.',
    stack: ['Flutter', 'Dart', 'Desktop', 'UX'],
    href: '/proyectos/shell-personalizable/',
    accent: 'purple',
    variant: 'screenshot',
    image: '/images/meson-widgets.webp',
    secondaryImage: '/images/meson-shell.webp',
    imageAlt: 'Captura del shell de Meson mostrando el tablero de widgets en vivo y El Diario',
  },
  {
    number: '05',
    title: 'Store de módulos',
    type: 'Subsistema de Meson · plataforma interna',
    description: 'Catálogo interno de módulos y suites, con estado de instalación, permisos y organización del escritorio.',
    stack: ['Flutter', 'Dart', 'Catálogo', 'Permisos'],
    href: '/proyectos/store-modulos/',
    accent: 'gold',
    variant: 'modules',
  },
  {
    number: '06',
    title: 'Alma — Comercio web en Next.js',
    type: 'Proyecto independiente · e-commerce',
    description: 'Tienda estilo marketplace en Next.js con catálogo, búsqueda difusa (Fuse.js), cuentas, Recharts, Resend, panel admin y checkout demo.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    href: '/proyectos/comercio-nextjs/',
    accent: 'gold',
    variant: 'screenshot',
    image: '/images/alma-storefront.webp',
    secondaryImage: '/images/alma-catalog.webp',
    imageAlt: 'Captura de la tienda web Alma construida en Next.js mostrando el hero editorial de colección',
  },
  {
    number: '07',
    title: 'Web de servicios técnicos',
    type: 'Proyecto Astro · sitio profesional',
    description: 'Sitio de servicios eléctricos y climatización con contenido configurable, galerías y contacto directo.',
    stack: ['Astro', 'Tailwind CSS', 'JavaScript'],
    href: '/proyectos/web-servicios/',
    accent: 'teal',
    variant: 'screenshot',
    image: '/images/web-servicios.webp',
    imageAlt: 'Captura del sitio web profesional en Astro y Tailwind CSS para servicios técnicos',
    liveUrl: 'https://set-ingenieria.vercel.app',
  },
  {
    number: '08',
    title: 'Plataforma QR/NFC de emergencia',
    type: 'Prototipo Astro · producto en desarrollo',
    description: 'Web de pulseras con fichas de emergencia, panel de usuario, inventario y flujos de pedidos todavía en desarrollo.',
    stack: ['Astro', 'TypeScript', 'Supabase', 'QR/NFC'],
    href: '/proyectos/pulseras-emergencia/',
    accent: 'orange',
    variant: 'screenshot',
    image: '/images/pulseras-qr.webp',
    secondaryImage: '/images/pulseras-catalog.webp',
    imageAlt: 'Captura de la plataforma MedPulse SOS con ficha médica QR/NFC y catálogo de pulseras',
    liveUrl: 'https://pulsera-medica.vercel.app',
  },
  {
    number: '09',
    title: 'App de clientes y comunidad',
    type: 'App de Meson · experiencia social',
    description: 'Descubrimiento, reservas y seguimiento, junto a una comunidad con publicaciones, medios, comentarios y reacciones.',
    stack: ['Flutter', 'Dart', 'Supabase', 'Flame'],
    href: '/proyectos/app-clientes/',
    accent: 'teal',
    variant: 'mobile-clients',
  },
  {
    number: '10',
    title: 'App de reparto',
    type: 'App de Meson · logística y mesh',
    description: 'Ofertas de pedidos, GPS, biometría, verificación QR/NFC, billetera de ingresos, mesh relay offline entre pares y cola local de reintentos.',
    stack: ['Flutter', 'Dart', 'Mesh / GPS', 'Supabase'],
    href: '/proyectos/app-reparto/',
    accent: 'blue',
    variant: 'mobile-delivery',
  },
  {
    number: '14',
    title: 'Atelier y Kiosco HR',
    type: 'Sub-plataforma de Meson · talento y nómina',
    description: 'Portal de empleo y gestión laboral tipo LinkedIn + ERP: candidatos, ofertas, perfiles, entrevistas, contratos, turnos, nómina, RBAC y kiosco de asistencia.',
    stack: ['Flutter', 'Dart', 'Supabase', 'Isar'],
    href: '/proyectos/atelier-empleados/',
    accent: 'teal',
    variant: 'modules',
  },
  {
    number: '15',
    title: 'Meson Central',
    type: 'App independiente · control financiero global',
    description: 'Consola super-admin para ingresos SaaS, costos de infraestructura, licenciamiento criptográfico de nodos, monitoreo de flota y tickets multi-tenant.',
    stack: ['Flutter', 'Supabase', 'Licencias', 'fl_chart'],
    href: '/proyectos/meson-central/',
    accent: 'gold',
    variant: 'modules',
  },
  {
    number: '16',
    title: 'Suite Rust Nativa e IA',
    type: '8 crates Rust en workspace · FFI cero-copia',
    description: 'Motor de hojas de cálculo con grafo DAG y XLSX, motor NLP local con TF-IDF/RAG en SQLite, delta updater qbsdiff, SIMD media y WebRTC nativo.',
    stack: ['Rust', 'FRB FFI', 'SQLite RAG', 'SIMD'],
    href: '/proyectos/suite-rust-nativa/',
    accent: 'orange',
    variant: 'ai-bevy',
    repoUrl: 'https://github.com/M4QSZ/ffi-arena-bridge',
  },
  {
    number: '17',
    title: 'Web Astro, Pausa y Paquetes',
    type: 'Suite comercial + 10 paquetes compartidos',
    description: 'Web oficial Astro (+300 páginas, calculadora ROI), apps Meson Pausa, Currency y BUCO (repo público), junto a meson_db, meson_chat E2E y meson_models.',
    stack: ['Astro', 'Flutter', 'Isar', 'E2E Chat'],
    href: '/proyectos/ecosistema-paquetes/',
    accent: 'purple',
    variant: 'screenshot',
    image: '/images/meson-web-devices.webp',
    secondaryImage: '/images/meson-widgets.webp',
    imageAlt: 'Vista multidispositivo de Meson Web junto a widgets y servicios compartidos',
    repoUrl: 'https://github.com/M4QSZ/BUCO',
  },
  {
    number: '11',
    title: 'Brasas (Flutter y Unity)',
    type: 'Videojuego multiplataforma · dos versiones',
    description: 'Aventura de acción en dos implementaciones: paquete compartido Flutter (Meson Pausa) y proyecto Unity 6.3 LTS en C# con pruebas automatizadas.',
    stack: ['Unity', 'C#', 'Flutter', 'Python'],
    href: '/proyectos/brasas/',
    accent: 'orange',
    variant: 'screenshot',
    image: '/images/brasas-play.webp',
    secondaryImage: '/images/brasas-map.webp',
    imageAlt: 'Captura del motor Unity de Brasas mostrando a Lía y Tilo en el Refugio de las promesas',
  },
  {
    number: '12',
    title: 'El Pueblo del Faro',
    type: 'Roblox Studio · experiencia en desarrollo',
    description: 'Base cliente/servidor en Luau, configuración Rojo y empaquetado automatizado en Python. Pendiente de pruebas en Roblox Studio.',
    stack: ['Roblox Studio', 'Luau', 'Python', 'Rojo'],
    href: '/proyectos/el-pueblo-del-faro/',
    accent: 'gold',
    variant: 'roblox',
  },
  {
    number: '13',
    title: 'Meson IA y prototipos',
    type: 'IA aplicada · Rust Bevy · flujos LLM',
    description: 'Integración y desarrollo por cuenta propia con LLMs (Meson IA), junto a un prototipo 2D en Rust con Bevy.',
    stack: ['LLMs / IA', 'Rust', 'Bevy', 'Python'],
    href: '/proyectos/meson-ia-prototipos/',
    accent: 'purple',
    variant: 'ai-bevy',
  },
];

export const capabilities = [
  {
    label: 'Apps multiplataforma y sistemas',
    detail: 'PC (Windows), móvil y web con código modular, motores Skia/Impeller, FFI nativo y control de versiones.',
    skills: ['Dart', 'Flutter', 'Skia / Impeller', 'Rust', 'Flutter Rust Bridge', 'Kotlin', 'Isar', 'LAN P2P / UDP / TCP', 'Git', 'Git LFS'],
  },
  {
    label: 'Web, bases de datos e IA',
    detail: 'Aplicaciones web, diseño relacional y NoSQL, migración Firebase/Firestore → Supabase/PostgreSQL, LLMs y Prompt Engineering.',
    skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Next.js', 'React', 'Astro', 'Python', 'PostgreSQL', 'Supabase', 'MySQL', 'SQLite', 'Cloud Firestore', 'Firebase', 'LLMs / Meson IA', 'Prompt Engineering'],
  },
  {
    label: 'Videojuegos, producto y equipo',
    detail: 'Motores activos, producto 0 a 1 (MVP con retroalimentación), fidelidad 1:1 a diseño (on-model), coordinación multidisciplinaria y AppSec.',
    skills: ['Unity', 'C#', 'Flame', 'Roblox Studio', 'Luau / Lua', 'Bevy (Rust)', 'Godot (base)', 'MVP (0 a 1)', 'Diseño 1:1 (on-model)', 'Coordinación de proyectos', 'Trabajo en equipo', 'Depuración / AppSec', 'C / C++', 'Java', 'PHP / Laravel', 'Django'],
  },
];
