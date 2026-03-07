# 📂 Project Structure

This document outlines the current architecture of the Crispy Bacon application, reflecting the actual implementation.

```text
/
├── app/                    # Next.js App Router (Routes & Layouts)
│   ├── api/                # Server-side API Routes
│   │   ├── analyze/        # Gemini AI processing
│   │   ├── ingest/         # Data ingestion
│   │   └── upload/         # File upload handling
│   ├── auth/               # Authentication routes
│   ├── dashboard/          # Authenticated app UI
│   ├── globals.css         # Global Tailwind CSS imports
│   ├── layout.tsx          # Root layout, wraps app in Providers
│   └── page.tsx            # Home page (Hero, CTA, Main UI)
├── components/             # Reusable UI Components
│   ├── providers/          # React Context Providers
│   │   └── QueryProvider.tsx # TanStack Query setup
│   ├── ui/                 # Base UI components
│   ├── ImportOrchestrator.tsx # Orchestrates imports
│   ├── PresenceInitializer.tsx # Presence management
│   └── ThemeProvider.tsx   # Theme management
├── docs/                   # Internal Knowledge Base
├── hooks/                  # Custom React Hooks
│   ├── use-mobile.ts       # Mobile detection
│   ├── useAIProcessor.ts   # AI processing logic
│   ├── useDocumentChat.ts  # Document chat logic
│   ├── useFileDrop.ts      # File drop handling
│   ├── useImportOrchestrator.ts # Import orchestration
│   ├── useInsightSubscription.ts # Insight subscription
│   ├── useMicrophone.ts    # Microphone input
│   └── usePresence.ts      # Presence tracking
├── lib/                    # Shared Logic & Utilities
│   ├── audioStore.ts       # Audio state management
│   ├── schemas.ts          # Zod runtime validation schemas
│   ├── storage/            # Storage utilities
│   ├── store.ts            # Global state management
│   ├── supabase/           # Supabase client initialization
│   ├── utils/              # Utility functions
│   └── utils.ts            # Shared utilities
└── middleware.ts           # Next.js middleware for auth/routing
```

## Key Directory Definitions

*   **`/app`**: Contains the core routing logic, including API routes, authentication, and the dashboard.
*   **`/components`**: Houses all modular UI components, including base UI components and specialized orchestrators.
*   **`/docs`**: The internal knowledge base.
*   **`/hooks`**: Custom hooks to encapsulate complex logic (e.g., audio recording, AI processing, presence tracking).
*   **`/lib`**: Non-UI logic (Supabase clients, state management, validation schemas, utility functions).
