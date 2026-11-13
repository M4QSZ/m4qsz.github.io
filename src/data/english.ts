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
  images?: { src: string; alt: string; caption: string }[];
  sections: [string, string][];
}

export const englishProjects: EnglishProject[] = [
  {
    slug: 'meson', number: '01', title: 'Meson', type: 'Private product · desktop, mobile & web',
    description: 'A multiplatform restaurant ecosystem (PC/Windows, mobile and web) with Rust native modules, local persistence and Firebase-to-Supabase sync.',
    stack: ['Flutter', 'Dart', 'Rust', 'Kotlin'],
    accent: 'orange',
    variant: 'screenshot',
    images: [
      { src: '/images/meson-shell.webp', alt: 'Current Meson desktop shell with launcher and Phone Link pane', caption: 'Current desktop shell — module launcher, Phone Link and live taskbar.' },
      { src: '/images/meson-floor-editor.webp', alt: 'Current isometric floor editor window in Meson', caption: 'Interactive isometric floor editor with multi-floor selector.' },
      { src: '/images/meson-widgets.webp', alt: 'Meson live widgets board and internal digest El Diario', caption: 'Widgets & News drawer with real-time operational counters.' },
      { src: '/images/meson-web-devices.webp', alt: 'Meson Web showcase across desktop, tablet and smartphone screens', caption: 'Official Meson web showcase across desktop, tablet and phone viewports.' },
    ],
    sections: [
      ['Product scope', 'The repository contains a business app (desktop/PC and mobile), a customer app with social community features, a delivery app, a website, shared models and native modules covering orders, tables, kitchen, inventory, payments, logistics and administration.'],
      ['Architecture', 'Flutter and Dart power the apps across desktop, mobile and web. Rust implements native and network logic through Flutter Rust Bridge, alongside Kotlin Android foreground services. Local persistence (Isar) supports work during Internet outages with deferred sync to Supabase/PostgreSQL after migration from Firebase/Firestore.'],
      ['What this case proves', 'It shows how product flows, native integrations and relational/NoSQL data fit into one modular multiplatform system. The implementation remains private; the linked technical cases explain selected subsystems.'],
      ['Measured repository scope', 'A local snapshot on September 27, 2026 counted 4,181 files with code extensions and 1,264,247 physical lines before filtering. This includes generated files. A heuristic filter for generated files and selected Meson app/package paths left 741,417 lines. These are repository metrics, not individual authorship or a measure of code quality.'],
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
      { src: '/images/meson-shell.webp', alt: 'Meson shell with app launcher, Phone Link panel and docked taskbar', caption: 'Modular app drawer, quick search bar and multi-window taskbar.' },
    ],
    sections: [
      ['Purpose', 'The shell brings Meson modules together in a shared workspace instead of treating each module as an isolated screen.'],
      ['Window model', 'The code manages internal windows, stacking order, snapping, minimizing and maximizing, and multiple workspaces.'],
      ['Personalization', 'Taskbar and visual settings include pinned items, themes, wallpaper and other saved preferences.'],
      ['Scope', 'This is an application shell built inside Flutter, not a replacement operating system.'],
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
    slug: 'comercio-nextjs', number: '06', title: 'Alma — Next.js e-commerce platform', type: 'Independent project · case study',
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
    slug: 'app-reparto', number: '10', title: 'Delivery app', type: 'Meson app · logistics',
    description: 'Order offers, a delivery map, status updates and a local retry queue for changes made during network outages.',
    stack: ['Flutter', 'Dart', 'Maps', 'Supabase'],
    accent: 'blue',
    variant: 'mobile-delivery',
    sections: [
      ['Operations', 'Drivers can toggle availability, browse orders and receive new order offers. The app manages accepted orders and displays restaurant and customer markers on a map.'],
      ['Delivery stages', 'The code covers arrival at the restaurant, pickup, transit and delivery, plus photo proof and history and earnings screens.'],
      ['Network recovery', 'A local service persists status and photo tasks and retries them when the remote service is available. Integration testing is needed before claiming delivery guarantees.'],
      ['Evidence', 'This case describes reviewed implementation, without claiming measured delivery times, geographic coverage or production scale.'],
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
        caption: 'Unity 6.3 LTS capture — Refugio de las promesas scene and custom HUD.',
      },
      {
        src: '/images/brasas-map.webp',
        alt: 'Unity route map overlay for Brasas showing connected chapter locations',
        caption: 'Unity 6.3 LTS capture — interactive route map and checkpoint progression.',
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
];
