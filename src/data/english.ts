export const englishProjects = [
  {
    slug: 'meson', number: '01', title: 'Meson', type: 'Private product · case study', accent: 'orange',
    description: 'A restaurant ecosystem with business, customer and delivery apps, native modules, local data and synchronization.',
    stack: ['Flutter', 'Dart', 'Rust', 'Astro'],
    sections: [
      ['Product scope', 'The repository contains a business app, a customer app with social community features, a delivery app, a website, shared models and native modules. The workflows cover orders, tables, kitchen, inventory, payments, logistics and administration.'],
      ['Architecture', 'Flutter and Dart power the apps. Rust implements native and network logic through Flutter Rust Bridge. Local persistence supports work during Internet outages, with a remote synchronization path when connectivity returns.'],
      ['What this case proves', 'It shows how product flows, native integrations and local data fit into one multiplatform system. The implementation remains private; the linked technical cases explain selected subsystems.'],
      ['Measured repository scope', 'A local snapshot on September 27, 2026 counted 4,181 files with code extensions and 1,264,247 physical lines before filtering. This includes generated files. A heuristic filter for generated files and selected Meson app/package paths left 741,417 lines. These are repository metrics, not individual authorship or a measure of code quality.'],
      ['Operational boundaries', 'Offline work needs devices and a functioning local network. Power outages require batteries or backup power. Recovery and synchronization need multi-device tests before making measured reliability claims.'],
      ['Ownership and limits', 'Miguel has led most of Meson’s design and implementation. He supervised a Flutter collaborator’s work and assigned the next tasks. This case does not claim unverified production scale, availability or business outcomes.'],
    ],
  },
  {
    slug: 'red-p2p', number: '02', title: 'Local P2P network', type: 'Meson subsystem · architecture', accent: 'blue',
    description: 'Local discovery and encrypted messages between devices, with deferred synchronization when Internet access returns.',
    stack: ['Rust', 'UDP/TCP', 'Dart', 'Isar'],
    sections: [
      ['Problem', 'Restaurant devices need to keep exchanging changes when their Internet connection fails.'],
      ['Implementation', 'The Rust layer includes local discovery, UDP and TCP transport, encrypted message envelopes and replay controls. Dart integrates the native engine with app state; Isar stores data and pending actions.'],
      ['Recovery', 'A local queue retains work to send through the remote path after connectivity returns. The code also includes retry and concurrent change handling.'],
      ['Physical dependency', 'Continuity during a power outage requires battery powered devices and a backed up local network. Software alone cannot keep hardware powered.'],
    ],
  },
  {
    slug: 'editor-mesas', number: '03', title: 'Interactive floor editor', type: 'Meson subsystem · interface', accent: 'green',
    description: 'A table and room editor with direct manipulation, 2D and isometric views, built with Flutter and Flame.',
    stack: ['Flutter', 'Flame', 'Dart'],
    sections: [
      ['Goal', 'Give staff a visual representation of tables, zones, seats and floors that can also be edited.'],
      ['Interaction', 'The Flame scene supports selection, dragging, rotation and scaling, as well as overhead and isometric views.'],
      ['Performance', 'The continuous update loop can pause when the scene is idle or hidden and resume on interaction.'],
      ['Data model', 'Visual table configuration is versioned and serialized separately from the editor; resource identifiers refer to catalog items instead of local file paths.'],
    ],
  },
  {
    slug: 'shell-personalizable', number: '04', title: 'Customizable shell', type: 'Meson subsystem · desktop experience', accent: 'purple',
    description: 'Internal windows, workspaces, a taskbar and saved visual preferences for an adaptable workstation.',
    stack: ['Flutter', 'Dart', 'Desktop UX'],
    sections: [
      ['Purpose', 'The shell brings Meson modules together in a shared workspace instead of treating each module as an isolated screen.'],
      ['Window model', 'The code manages internal windows, stacking order, snapping, minimizing and maximizing, and multiple workspaces.'],
      ['Personalization', 'Taskbar and visual settings include pinned items, themes, wallpaper and other saved preferences.'],
      ['Scope', 'This is an application shell built inside Flutter, not a replacement operating system.'],
    ],
  },
  {
    slug: 'store-modulos', number: '05', title: 'Internal module Store', type: 'Meson subsystem · modular platform', accent: 'gold',
    description: 'An internal catalog with 44 registered entries, suites, permissions and module state in the shell.',
    stack: ['Flutter', 'Dart', 'Modules'],
    sections: [
      ['Catalog', 'The repository registers 44 entries across restaurant operations, management, productivity and games. Entries can have different levels of implementation.'],
      ['Integration', 'The Store groups modules and suites and connects selection to permissions, licensing and the shell workspace.'],
      ['Installation state', 'Installing an individual module currently records its activation and version locally. This does not mean independent executable code is downloaded.'],
      ['Scope', 'The Store is an internal product catalog, not a public app marketplace with verified live purchases.'],
    ],
  },
  {
    slug: 'comercio-nextjs', number: '06', title: 'Next.js commerce site', type: 'Independent project · case study', accent: 'blue',
    description: 'A jewelry storefront with catalog, search, accounts, administration and a demonstration checkout.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    sections: [
      ['Customer experience', 'The project includes collections, categories, product pages, search, cart, accounts and an order history.'],
      ['Architecture', 'Next.js and React power the interface. Supabase supplies authentication and data. The code includes server actions, fuzzy search, page metadata, a sitemap and structured search data.'],
      ['Administration', 'The admin area includes inventory, categories, collections, orders, promotions, banners, metrics and SEO settings, with defined roles and permissions.'],
      ['Current limit', 'The checkout currently simulates payment processing. It must not be presented as a live payment gateway or a production ready commerce flow.'],
    ],
  },
  {
    slug: 'web-servicios', number: '07', title: 'Technical services website', type: 'Astro project · professional site', accent: 'green',
    description: 'A service website with configurable content, project gallery and direct contact channels.',
    stack: ['Astro', 'Tailwind CSS', 'JavaScript'],
    sections: [
      ['Goal', 'Present electrical and climate control services, experience, process, testimonials, projects and contact routes clearly.'],
      ['Implementation', 'Astro and Tailwind CSS organize the site into reusable sections and a responsive layout.'],
      ['Maintenance', 'A central configuration stores the key contact and business information, reducing edits across individual components.'],
      ['Evidence', 'The local implementation was reviewed. Traffic, lead generation and business results have not been verified.'],
    ],
  },
  {
    slug: 'pulseras-emergencia', number: '08', title: 'QR/NFC emergency platform', type: 'Astro prototype · in development', accent: 'purple',
    description: 'A wristband linked web prototype with emergency cards, user dashboards, inventory and order flows.',
    stack: ['Astro', 'TypeScript', 'Supabase', 'QR/NFC'],
    sections: [
      ['Concept', 'The code includes pages for an emergency card reached through a QR or NFC linked address, as well as activation and user access flows.'],
      ['Platform', 'Astro and TypeScript provide pages and server routes. Supabase supplies data and authentication. A translation dictionary supports the emergency card interface.'],
      ['Operations', 'The prototype includes catalog, orders, tracking, admin tools and QR generation. Payment integration is still under development.'],
      ['Current limit', 'Hardware, deployment, privacy, security and payment workflows need validation before any real world medical or commercial use.'],
    ],
  },
  {
    slug: 'app-clientes', number: '09', title: 'Customer and community app', type: 'Meson app · social experience', accent: 'green',
    description: 'Restaurant discovery, reservations and delivery tracking alongside a social community with posts and reactions.',
    stack: ['Flutter', 'Dart', 'Supabase', 'Flame'],
    sections: [
      ['Customer journey', 'The app contains restaurant discovery, search, business profiles, favorites, menus and customer profiles. A visual table selector supports reservations.'],
      ['Community', 'Its Radar module includes a post feed, image and video uploads, comments and reactions. The repository also contains stories, community exploration, profiles and groups for meetups.'],
      ['Connected services', 'Reservation and delivery screens connect the social experience to restaurant workflows, including tracking and order history.'],
      ['Evidence', 'These screens and services were reviewed in the repository. Active user numbers, moderation outcomes and production scale have not been verified.'],
    ],
  },
  {
    slug: 'app-reparto', number: '10', title: 'Delivery app', type: 'Meson app · logistics', accent: 'blue',
    description: 'Order offers, a delivery map, status updates and a local retry queue for changes made during network outages.',
    stack: ['Flutter', 'Dart', 'Maps', 'Supabase'],
    sections: [
      ['Operations', 'Drivers can toggle availability, browse orders and receive new order offers. The app manages accepted orders and displays restaurant and customer markers on a map.'],
      ['Delivery stages', 'The code covers arrival at the restaurant, pickup, transit and delivery, plus photo proof and history and earnings screens.'],
      ['Network recovery', 'A local service persists status and photo tasks and retries them when the remote service is available. Integration testing is needed before claiming delivery guarantees.'],
      ['Evidence', 'This case describes reviewed implementation, without claiming measured delivery times, geographic coverage or production scale.'],
    ],
  },
];
