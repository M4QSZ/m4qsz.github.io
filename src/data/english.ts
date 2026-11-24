import type { ProjectVariant } from './profile';

export interface EnglishProject {
  slug: string;
  number: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  accent?: string;
  variant?: ProjectVariant;
  status?: string;
  liveUrl?: string;
  repoUrl?: string;
  paperUrl?: string;
  pdfUrl?: string;
  images?: { src: string; alt: string; caption: string }[];
  sections: [string, string][];
}

export const englishProjects: EnglishProject[] = [
  {
    slug: 'meson', number: '01', title: 'Meson', type: 'Private ecosystem · desktop, mobile & web',
    description: 'Multiplatform suite (~963k LOC in meson_business): POS, weigh-scale self-checkout, double-entry/BOM/SENIAT ERP, Atelier HR, WebRTC chat, Rust Office, Whisper offline AI & Astro web.',
    stack: ['Flutter', 'Dart', 'Rust', 'Kotlin'],
    accent: 'orange',
    variant: 'screenshot',
    repoUrl: 'https://github.com/M4QSZ/ffi-arena-bridge',
    images: [
      { src: '/images/meson-shell.webp', alt: 'Meson Desktop 44-module launcher with snapped 2.5D Tables and System Health windows', caption: 'Desktop shell: 44-module launcher, snapped windows and live taskbar.' },
      { src: '/images/meson-floor-editor.webp', alt: 'Current isometric floor editor window in Meson', caption: 'Interactive isometric floor editor with multi-floor selector.' },
      { src: '/images/meson-widgets.webp', alt: 'Meson live widgets board and internal digest El Diario', caption: 'Widgets & News drawer with real-time operational counters.' },
      { src: '/images/meson-web-devices.webp', alt: 'Meson Web showcase across desktop, tablet and smartphone screens', caption: 'Official Meson web showcase across desktop, tablet and phone viewports.' },
    ],
    sections: [
      ['Product scope', 'The monorepo houses specialized multiplatform apps: meson_business (2,521 Dart files / 527 test files covering POS, retail, restaurant & supermarket self-checkout with RS-232/USB weigh-scale anti-theft check, KDS, Flame 2.5D CAD with 70+ 360° assets, WebRTC VoIP/video chat, B2B marketplace, native Rust Office suite [Writer, DAG/XLSX Sheets, Slides], BOM recipes, 3-way AP invoice matching, double-entry accounting, SENIAT fiscal hash audit, Atelier HR/payroll + PIN kiosk and 18 Store industry suites), meson_central, meson_delivery (peer mesh relay), meson_customer (Rust backend), meson_pause, meson_currency, BUCO, 10 shared packages and a 189-page mobile-first Astro web platform.'],
      ['Architecture', 'Flutter and Dart power the apps with Deferred Components loading and adaptive memory profiles. Rust implements native modules and 49 FFI APIs across 8 crates (including HLC/CRDT P2P, AES-256-GCM/Argon2, offline Whisper STT fallback, qbsdiff binary delta updater and Win32 user32.dll input-freeze recovery), alongside Kotlin Android foreground services and Isar + WAL persistence syncing to Supabase/PostgreSQL after migrating from Firebase.'],
      ['What this case proves', 'It shows how complex retail/hospitality workflows, hardware drivers, local AI and distributed sync fit into one modular multiplatform system. The repo remains private; linked technical cases and OSS Rust/Dart repos explain core subsystems.'],
      ['Measured repository scope', 'Direct audit of apps/meson_business verified 2,521 Dart source files (912,888 lines) and 273 Rust source files (50,270 lines) across rust/src and workspace crates (~963,158 lines) inside meson_business alone, within a broader monorepo that counted 4,181 code files in a prior September 2026 snapshot. These are source-code size metrics rather than external uptime claims.'],
      ['Operational boundaries', 'Offline work needs devices and a functioning local network. Power outages require batteries or backup power. Recovery and synchronization need multi-device tests before making measured reliability claims.'],
      ['Ownership and limits', 'Miguel has led most of Meson’s design and implementation. He supervised a Flutter collaborator’s work and assigned the next tasks. This case does not claim unverified production scale, availability or business outcomes.'],
    ],
  },
  {
    slug: 'red-p2p', number: '02', title: 'Local P2P network', type: 'Meson subsystem · architecture',
    description: 'Local discovery and encrypted messages between devices, with deferred synchronization when Internet access returns.',
    stack: ['Rust', 'UDP/TCP', 'Dart', 'Isar'],
    accent: 'blue',
    variant: 'p2p',
    repoUrl: 'https://github.com/M4QSZ/lan-delta-sync',
    sections: [
      ['Problem', 'Restaurant devices need to keep exchanging changes when their Internet connection fails.'],
      ['Implementation', 'The Rust layer includes local discovery, UDP and TCP transport, encrypted message envelopes and replay controls. Dart integrates the native engine with app state; Isar stores data and pending actions.'],
      ['Recovery', 'A local queue retains work to send through the remote path after connectivity returns. The code also includes retry and concurrent change handling.'],
      ['Test evidence', 'Six focused Flutter tests passed locally, covering tenant isolation, node priority, Lamport ordering and inventory-change compaction. These are component tests; a reproducible two-device demonstration without Internet access is still needed.'],
      ['Physical dependency', 'Continuity during a power outage requires battery powered devices and a backed up local network. Software alone cannot keep hardware powered.'],
    ],
  },
  {
    slug: 'editor-mesas', number: '03', title: 'Interactive floor editor', type: 'Meson subsystem · interface',
    description: 'A table and room editor with direct manipulation, 2D and isometric views, built with Flutter and Flame.',
    stack: ['Flutter', 'Flame', 'Dart'],
    accent: 'teal',
    variant: 'screenshot',
    images: [
      { src: '/images/meson-floor-editor.webp', alt: 'Interactive isometric floor editor in Meson with Floor 1 and Floor 2 toggle', caption: 'Isometric room view with customizable furniture and multi-floor switching.' },
      { src: '/images/meson-shell.webp', alt: 'Meson launcher opening the Tables module inside desktop shell', caption: 'Shell launcher integration alongside companion POS modules.' },
    ],
    sections: [
      ['Goal', 'Give staff a visual representation of tables, zones, seats and floors that can also be edited.'],
      ['Interaction', 'The Flame scene supports selection, dragging, rotation and scaling, as well as overhead and isometric views.'],
      ['Performance', 'The continuous update loop can pause when the scene is idle or hidden and resume on interaction.'],
      ['Data model', 'Visual table configuration is versioned and serialized separately from the editor; resource identifiers refer to catalog items instead of local file paths.'],
    ],
  },
  {
    slug: 'shell-personalizable', number: '04', title: 'Customizable shell', type: 'Meson subsystem · desktop experience',
    description: 'Internal windows, workspaces, a taskbar and saved visual preferences for an adaptable workstation.',
    stack: ['Flutter', 'Dart', 'Desktop UX'],
    accent: 'purple',
    variant: 'screenshot',
    images: [
      { src: '/images/meson-widgets.webp', alt: 'Widgets and El Diario digest drawer inside Meson customizable shell', caption: 'Live Widgets & News drawer anchored inside the desktop shell.' },
      { src: '/images/meson-shell.webp', alt: 'Meson shell with app launcher, snapped 2.5D Tables and System Health panels', caption: 'Modular app drawer, snapped multi-window layout and live taskbar.' },
    ],
    sections: [
      ['Purpose', 'The shell brings Meson modules together in a shared workspace instead of treating each module as an isolated screen.'],
      ['Window model', 'The code manages internal windows, stacking order, snapping, minimizing and maximizing, and multiple workspaces.'],
      ['Personalization, subscriptions & peripherals', 'Layered settings across 176 files handle themes, plan subscriptions/licensing, WebView2 multi-tab browsing, audio/video/image media playback, native calculator, embedded games (Flame / meson_brasas) and device_hub (Customer-Facing Displays, scales, ESC/POS USB/LAN/BLE printers, NFC).'],
      ['Multi-target optimization', 'Window state isolates tree rebuilds and batches resize ticks, while platform_specific conditional stubs tailor desktop, mobile and Web builds and offload compute to 49 Rust API modules.'],
    ],
  },
  {
    slug: 'store-modulos', number: '05', title: 'Internal module Store', type: 'Meson subsystem · modular platform',
    description: 'An internal catalog with 44 registered entries, suites, permissions and module state in the shell.',
    stack: ['Flutter', 'Dart', 'Modules'],
    accent: 'gold',
    variant: 'modules',
    sections: [
      ['Catalog', 'The repository registers 44 entries across restaurant operations, management, productivity and games. Entries can have different levels of implementation.'],
      ['Integration', 'The Store groups modules and suites and connects selection to permissions, licensing and the shell workspace.'],
      ['Installation state', 'Installing an individual module currently records its activation and version locally. This does not mean independent executable code is downloaded.'],
      ['Scope', 'The Store is an internal product catalog, not a public app marketplace with verified live purchases.'],
    ],
  },
  {
    slug: 'comercio-nextjs', number: '06', title: 'Alma: Next.js e-commerce platform', type: 'Independent project · case study',
    description: 'Marketplace-style storefront with catalog, fuzzy search (Fuse.js), accounts, Recharts analytics, Resend emails, admin panel and demo checkout.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    accent: 'gold',
    variant: 'screenshot',
    images: [
      { src: '/images/alma-storefront.webp', alt: 'Alma luxury jewelry storefront hero built in Next.js', caption: 'Editorial storefront hero and live header search built with Next.js & Tailwind CSS.' },
      { src: '/images/alma-catalog.webp', alt: 'Curated collections section on Alma e-commerce storefront', caption: 'Responsive category showcase cards connected to dynamic storefront routes.' },
    ],
    sections: [
      ['Customer experience', 'Built for Alma, the storefront covers home discovery, collections, categories, product pages, cart, customer accounts and order tracking.'],
      ['Architecture', 'Next.js, React, TypeScript and Tailwind CSS power the UI. Supabase handles authentication and database state alongside server actions, Fuse.js fuzzy search, Recharts metrics, Resend emails, metadata and sitemap routes.'],
      ['Administration', 'The admin dashboard manages inventory, categories, collections, orders, promotions, banners, metrics and SEO configuration with defined roles and permissions.'],
      ['Current limit', 'The checkout simulates payment processing for demonstration purposes. It must not be presented as a live payment gateway or production store traffic.'],
    ],
  },
  {
    slug: 'web-servicios', number: '07', title: 'Technical services website', type: 'Astro project · professional site',
    description: 'A service website with configurable content, project gallery and direct contact channels.',
    stack: ['Astro', 'Tailwind CSS', 'JavaScript'],
    accent: 'teal',
    variant: 'screenshot',
    liveUrl: 'https://set-ingenieria.vercel.app',
    images: [
      { src: '/images/web-servicios.webp', alt: 'Astro technical services website hero with service overview and contact links', caption: 'Responsive Astro + Tailwind layout driven by a single central configuration file.' },
    ],
    sections: [
      ['Goal', 'Present electrical and climate control services, experience, process, testimonials, projects and contact routes clearly.'],
      ['Implementation', 'Astro and Tailwind CSS organize the site into reusable sections and a responsive layout.'],
      ['Maintenance', 'A central configuration stores the key contact and business information, reducing edits across individual components.'],
      ['Evidence', 'The local implementation was reviewed. Traffic, lead generation and business results have not been verified.'],
    ],
  },
  {
    slug: 'pulseras-emergencia', number: '08', title: 'QR/NFC emergency platform', type: 'Astro prototype · in development',
    status: 'Prototype',
    description: 'A wristband linked web prototype with emergency cards, user dashboards, inventory and order flows.',
    stack: ['Astro', 'TypeScript', 'Supabase', 'QR/NFC'],
    accent: 'orange',
    variant: 'screenshot',
    liveUrl: 'https://pulsera-medica.vercel.app',
    images: [
      { src: '/images/pulseras-qr.webp', alt: 'MedPulse SOS hero explaining instant QR/NFC medical card access', caption: 'Landing flow presenting QR/NFC emergency scan response and demo card.' },
      { src: '/images/pulseras-catalog.webp', alt: 'Wristband product catalog tiers in MedPulse SOS prototype', caption: 'Configurable wristband tiers connected to order tracking and admin tooling.' },
    ],
    sections: [
      ['Concept', 'The code includes pages for an emergency card reached through a QR or NFC linked address, as well as activation and user access flows.'],
      ['Platform', 'Astro and TypeScript provide pages and server routes. Supabase supplies data and authentication. A translation dictionary supports the emergency card interface.'],
      ['Operations', 'The prototype includes catalog, orders, tracking, admin tools and QR generation. Payment integration is still under development.'],
      ['Current limit', 'Hardware, deployment, privacy, security and payment workflows need validation before any real world medical or commercial use.'],
    ],
  },
  {
    slug: 'app-clientes', number: '09', title: 'Customer and community app', type: 'Meson app · social experience',
    description: 'Restaurant discovery, reservations and delivery tracking alongside a social community with posts and reactions.',
    stack: ['Flutter', 'Dart', 'Supabase', 'Flame'],
    accent: 'teal',
    variant: 'mobile-clients',
    sections: [
      ['Customer journey', 'The app contains restaurant discovery, search, business profiles, favorites, menus and customer profiles. A visual table selector supports reservations.'],
      ['Community', 'Its Radar module includes a post feed, image and video uploads, comments and reactions. The repository also contains stories, community exploration, profiles and groups for meetups.'],
      ['Connected services', 'Reservation and delivery screens connect the social experience to restaurant workflows, including tracking and order history.'],
      ['Evidence', 'These screens and services were reviewed in the repository. Active user numbers, moderation outcomes and production scale have not been verified.'],
    ],
  },
  {
    slug: 'app-reparto', number: '10', title: 'Delivery app', type: 'Meson app · logistics & mesh relay',
    description: 'Order offers, GPS geofencing, biometrics, QR/NFC delivery proof, courier wallet and an offline peer mesh relay with local retry queue.',
    stack: ['Flutter', 'Dart', 'Mesh / GPS', 'Supabase'],
    accent: 'blue',
    variant: 'mobile-delivery',
    sections: [
      ['Operations & verification', 'Drivers toggle shifts, accept routed orders on Google Maps / OpenStreetMap with geofencing, verify handoffs via mobile_scanner barcode/QR, NFC tags and photo proof, authenticate with local_auth biometrics and track earnings.'],
      ['Offline peer mesh relay', 'Includes mesh_relay components allowing couriers to exchange dispatch/status payloads in zero-signal zones alongside an OfflineSyncService local retry queue that reconciles state on reconnect.'],
      ['Delivery stages & telemetry', 'Handles restaurant arrival, pickup, transit, voice memos and smart dispatch notifications across mobile hardware.'],
      ['Evidence & limits', 'Reviewed directly in apps/meson_delivery; production fleet latency, GPS coverage and emergency trigger integration require live field validation before SLAs.'],
    ],
  },
  {
    slug: 'atelier-empleados', number: '14', title: 'Atelier & Attendance Kiosk', type: 'Meson sub-platform · HR, talent & payroll',
    description: 'LinkedIn-style talent marketplace + enterprise workforce suite inside meson_business: recruiting, interviews, RBAC, shifts, payroll and PIN attendance kiosk.',
    stack: ['Flutter', 'Dart', 'Supabase', 'Isar'],
    accent: 'teal',
    variant: 'atelier-hr',
    sections: [
      ['Talent marketplace workflow', 'features/atelier connects job offers (ofertas), candidate pipelines (candidatos), multi-step worker profiles (worker_profile), applications (postulaciones) and interviews (entrevistas) inside the core suite.'],
      ['Payroll, contracts & RBAC', 'Covers active staff directory (empleados_personal), hiring and termination workflows (laboral_tab), payroll calculations (nomina_tab), shift scheduling, leave/permit petitions and granular role/permission tables (roles_tab / permissions_tab).'],
      ['Standalone Attendance Kiosk', 'Companion features/asistencia_kiosk turns shared storefront hardware into an offline-capable terminal with admin auth gate, Cedula/PIN verification and entry/lunch/exit shift state machines.'],
      ['Ownership & scope', 'Architecture, shared RBAC domain models (meson_models) and state logic led by Miguel alongside contributor UI refinements; full private source stays closed.'],
    ],
  },
  {
    slug: 'meson-central', number: '15', title: 'Meson Central: Global Control', type: 'Standalone Flutter app · SaaS super-admin',
    description: 'Centralized operations and financial control plane for the ecosystem: cryptographic node licensing, SaaS revenue, cloud costs, fleet monitor and support desk.',
    stack: ['Flutter', 'Supabase', 'Licensing', 'fl_chart'],
    accent: 'gold',
    variant: 'meson-central',
    sections: [
      ['Financial & revenue governance', 'Tracks global SaaS revenue streams (revenue_streams_screen & revenue_registry), infrastructure/cloud platform costs (platform_costs_screen) and cash flow visualizations with fl_chart.'],
      ['Cryptographic node licensing', 'license_service.dart and key_generator_dialog.dart issue and validate node license keys linked to storefront feature suites and audit states.'],
      ['Fleet, sponsorships & support desk', 'Unifies live courier fleet monitoring (fleet_monitoring_screen), commercial brand sponsorships and a multi-tenant customer/business support ticket desk.'],
      ['Ownership', 'Built as a standalone Flutter management client connected to Supabase under Miguel’s architecture without exposing tenant credentials publicly.'],
    ],
  },
  {
    slug: 'suite-rust-nativa', number: '16', title: 'Native Rust Suite & Local AI', type: '8 Rust workspace crates · zero-copy FFI',
    description: 'Production Rust engine behind flutter_rust_bridge: DAG spreadsheet + XLSX engine, local TF-IDF/RAG NLP assistant, qbsdiff delta updater, SIMD media and WebRTC.',
    stack: ['Rust', 'FRB FFI', 'SQLite RAG', 'SIMD'],
    accent: 'orange',
    variant: 'rust-suite',
    repoUrl: 'https://github.com/M4QSZ/ffi-arena-bridge',
    sections: [
      ['Desktop office engines (meson_tools)', 'Implements sheets_engine from scratch in Rust with chunked cell storage, a DAG dependency graph, formula parser/evaluator and XLSX export, plus writer_engine, slides_engine, phone_link_engine, snipping and file explorer engines.'],
      ['Local NLP & SQLite RAG (meson_ai)', 'Runs intent classification, multi-intent resolution, TF-IDF and SIF embeddings, phonetic + Levenshtein spellchecking, stemming, slang dictionaries, SQLite retrieval and calibrated rate limiting natively without blocking the Dart isolate, paired with an offline local Whisper STT fallback and precached Rust TTS prompts during outages.'],
      ['49 Rust API modules, 50,270 LOC, SIMD & Win32 recovery', 'meson_shell bundles hardware-bound HMAC licensing (7-day offline anti-clock-tampering grace window) and qbsdiff binary delta patching; meson_media runs SIMD image resizing (fast_image_resize); 273 Rust files cover marketplace_engine, calculator_engine (shrinkage & par math), device_scanner, printer_engine, procedural_3d_engine, meson_webrtc, AES-256-GCM + Argon2 LAN P2P and Win32 user32.dll C++/FFI input-freeze recovery.'],
      ['Public clean-room proof', 'While the 8 internal workspace crates remain private, public repositories ffi-arena-bridge and lan-delta-sync expose Miguel’s solo Rust FFI and AEAD/CRDT sync design with green Linux + Windows CI.'],
    ],
  },
  {
    slug: 'ecosistema-paquetes', number: '17', title: 'Astro Web, Pausa & Shared Packages', type: 'Commercial web + 10 monorepo packages',
    description: '189-page mobile-first Astro commercial website, Meson Pausa wellness app, Currency calculator, public BUCO discovery app and decoupled packages (meson_db, meson_chat).',
    stack: ['Astro', 'Flutter', 'Isar', 'E2E Chat'],
    accent: 'purple',
    variant: 'screenshot',
    repoUrl: 'https://github.com/M4QSZ/BUCO',
    images: [
      { src: '/images/meson-web-devices.webp', alt: 'Responsive Astro Meson commercial web platform across desktop, tablet and phone', caption: 'Astro commercial platform refactored for fast mobile conversion, ERP showcase and multi-language SEO.' },
      { src: '/images/meson-widgets.webp', alt: 'Shared desktop widgets and internal feed powered by decoupled monorepo packages', caption: 'Modular widgets and shared services backed by meson_models, meson_db and meson_chat.' },
    ],
    sections: [
      ['189-page mobile-first Astro web (apps/website)', 'Clean Tailwind + TypeScript conversion storefront (<95 KB HTML homepage), modular ERP breakdown (/modulos/), real desktop/mobile captures and 19-language SEO editorial cluster.'],
      ['Companion Flutter apps (meson_pause, currency & BUCO)', 'meson_pause (15 test files) combines circadian meal timing, intermittent fasting safety protocols, Web Audio calm soundscapes and embedded meson_brasas gameplay; meson_currency handles multi-currency calculations; BUCO (22 test files, public repo M4QSZ/BUCO) targets Panama restaurant discovery.'],
      ['10 decoupled workspace packages', 'Includes meson_db (Isar schemas + idempotency sync adapter, 7 tests), meson_chat (E2E encryption + presence across desktop/mobile), meson_models (33 domain models, 24 tests), meson_core (multi-tenant resolver), meson_maps, meson_ui, meson_brasas and shared_models.'],
      ['Attribution', 'Miguel led ecosystem architecture, core Rust/Flutter systems and package design (769/860 commits on active branch); collaborator Leonardo Gutiérrez contributed UI widgets and selected Flutter screens (~91 commits).'],
    ],
  },
  {
    slug: 'brasas', number: '11', title: 'Brasas (Flutter & Unity)', type: 'Multiplatform game · two engines',
    description: 'Action adventure built across two engines: a shared Flutter package embedded in Meson Pausa and a Unity 6.3 LTS (C#) adaptation with EditMode/PlayMode tests.',
    stack: ['Unity', 'C#', 'Flutter', 'Python'],
    accent: 'orange',
    variant: 'screenshot',
    images: [
      {
        src: '/images/brasas-play.webp',
        alt: 'Unity editor runtime capture of Brasas showing character Lía, lantern companion Tilo, and HUD',
        caption: 'Unity 6.3 LTS capture: Refugio de las promesas scene and custom HUD.',
      },
      {
        src: '/images/brasas-map.webp',
        alt: 'Unity route map overlay for Brasas showing connected chapter locations',
        caption: 'Unity 6.3 LTS capture: interactive route map and checkpoint progression.',
      },
    ],
    sections: [
      ['Two implementations', 'Brasas exists both as a shared Flutter package (meson_brasas, playable standalone and embedded inside the multiplatform Meson Pausa app) and as a dedicated Unity 6.3 LTS project in C#.'],
      ['Unity architecture & tests', 'Combat simulation lives in a decoupled C# assembly separated from Unity engine presentation/input. Automated checks include EditMode and PlayMode test suites covering shrines, abilities, saves and seeded encounters, supported by Python content and verification scripts.'],
      ['Flutter integration', 'The Flutter edition shares gameplay and audio assets across desktop, web and mobile targets while keeping local run storage separated per host application.'],
      ['Current scope', 'PC editor builds, unit/PlayMode checks and GPU art captures were verified locally; full campaign completion, mobile exports and live performance profiling remain pending.'],
    ],
  },
  {
    slug: 'el-pueblo-del-faro', number: '12', title: 'El Pueblo del Faro', type: 'Roblox Studio · in development',
    status: 'In development',
    accent: 'gold',
    variant: 'roblox',
    description: 'Independent Roblox experience built with Luau client/server scripts, Rojo configuration and Python packaging/verification tools.',
    stack: ['Roblox Studio', 'Luau', 'Python', 'Rojo'],
    sections: [
      ['Architecture', 'Separates shared simulation/config in ReplicatedStorage from server-authoritative session and validation scripts in ServerScriptService and client presentation/input scripts in StarterPlayerScripts.'],
      ['Tooling', 'Includes a Rojo project file and Python CLI scripts to validate script references and package the place into XML (.rbxlx) artifacts outside Studio.'],
      ['Current limit', 'Scripts and packaging checks were created locally, but the project has not yet been executed inside Roblox Studio or published to players.'],
    ],
  },
  {
    slug: 'meson-ia-prototipos', number: '13', title: 'Meson IA & prototypes', type: 'Applied AI · Rust Bevy · experimentation',
    status: 'Independent work',
    accent: 'purple',
    variant: 'ai-bevy',
    description: 'Self-directed LLM integration and applied AI tooling (Meson IA), alongside a Rust Bevy 2D prototype and Godot familiarity.',
    stack: ['LLMs / AI', 'Rust', 'Bevy', 'Python'],
    sections: [
      ['Meson IA & applied LLMs', 'Independent development and integration of LLM-assisted workflows, prompt pipelines and practical AI tooling built outside public repositories.'],
      ['Rust Bevy prototype', 'Experimental 2D game prototype using Rust (2024 edition) and Bevy 0.14.0 to explore ECS architecture outside Flutter and Unity.'],
      ['Breadth & boundaries', 'Combined with Godot familiarity and prior course/pre-Git work in C, C++, Java, PHP/Laravel, Django and relational/NoSQL databases (MySQL, SQLite, Cloud Firestore, PostgreSQL).'],
    ],
  },
  {
    slug: 'cockpit', number: '18', title: 'Cockpit v2.2: Multi-CLI Orchestrator', type: 'Native Rust + GPUI desktop · MCP · 6 Technical Reports',
    status: 'Private source · 6 Public Technical Reports (10 in Lab)',
    accent: 'orange',
    variant: 'rust-suite',
    paperUrl: '/en/lab/cockpit-paper/',
    pdfUrl: '/papers/cockpit-orchestrator-paper.pdf',
    description: 'Native Rust + GPUI desktop orchestrator (~78k LOC, 57 runtime modules, 228 tests) and concurrent stdio MCP server unifying Claude Code, Codex CLI, Antigravity and OpenCode with automatic RTK interception (PreToolUse + PATH shims), hot quota Auto-Failover, $0 specialized pipelines, and local-first multi-device P2P/4G.',
    stack: ['Rust', 'GPUI', 'MCP', 'Iroh QUIC'],
    sections: [
      ['Unified multi-CLI runtime (v2.2 scale)', 'Built as a three-crate Rust workspace (73 Rust files, ~78,000 LOC, 57 runtime modules) paired with a Kotlin Android companion (~2.7k LOC) and Python 3D/observatory pipelines (~3.6k LOC), supervising Claude Code, Codex CLI, Antigravity and OpenCode with normalized NDJSON streaming, hidden Windows processes, Pre-Flight health checks, hot quota Auto-Failover, and 90-second live quota probing.'],
      ['Automatic RTK interception & accurate delta telemetry (Paper 10)', 'Moves RTK filtering beneath native CLI tools via Claude Code PreToolUse updatedInput rewriting and recursion-safe PATH shims (cli_shims/, verified −85.0% live on cargo test: 1,932 B → 289 B), fixes 7.4x cumulative session inflation by exact deltas, adds file-locked atomic JSONL appends with }{ recovery (+2,315 events rescued), TokenSaving telemetry, :L external editor jump, and a local HTML Telemetry Observatory.'],
      ['Deterministic token-efficiency & zero-vision $0 pipelines (Papers 1 & 2)', 'Pure-Rust fs_skeleton achieves 94.13% average token reduction (97.07% on app.rs in 38.0 ms), cli_filter cuts verbose test/stacktrace output by 84.94% (96.83% on 123-test cargo test), and compact_context compresses 18-turn sessions by 88.34%–97.31% while preserving KV-cache prefixes. Expanded with 0-click 7-provider S→D Cloud 3D (Hunyuan3D-2.1/TRELLIS.2) + Blender polish, 10-rule Unity C# auditor, 14-rule Roblox Luau auditor, and Math/Music Evolve Lab (Lean 4, Z3, SymPy, CaDiCaL, Basic Pitch, LUFS MIR, LilyPond, Faust).'],
      ['Power-loss crash resilience, self-healing & fingerprinting (Paper 9)', 'Mirrors Meson’s power-outage durability via split atomic persistence (workspace_index.json + sessions/<id>.jsonl) with 15s background sync_all() flushes, /recover CLI import, PC↔Laptop mirror sync, zero-token Git-anchored delta resumption, automatic stale CLI session self-healing on interrupted errors, and Black-Box Behavioral Fingerprinting (ThinkingLoopGuard + ConsecutiveFailGuard 2x FNV-1a + 7-class taxonomy).'],
      ['Multi-device P2P/4G, zero-downtime CI & verification (Paper 3)', 'Includes Unified & Side-by-Side diff review, Git worktree quality gates, Hyper /v1/* HMAC-SHA256 API, Iroh QUIC (ALPN cockpit/p2p/1), Tailscale Serve, zero-Tailscale 4G Cloudflare relay, app-scoped WireGuard (wgproxyrs), PC↔Linux /offload, Kotlin Android companion, zero-downtime Windows self-update, and Windows/Linux GitHub Actions release CI. Verified by 228 passing Rust unit tests (17 core + 211 runtime).'],
    ],
  },
];
