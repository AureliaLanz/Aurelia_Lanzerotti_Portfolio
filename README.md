# Digital Corps React Template

An opinionated starting point for React projects for our dev team. This template is meant to standardize project structure, formatting,
accessibility linting, API boundaries, routing, React Compiler, and shared
development commands without introducing a large application framework.

## Start a project

Create a repository from this GitHub template, update the package name, page title and description, favicon, design tokens, and starter content

```sh
nvm use
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when the application needs environment
configuration. Values beginning with `VITE_` are included in browser code and
must never contain secrets!!!!

## Commands

| Command                | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the Vite development server                   |
| `npm run format`       | Format supported files with Prettier                |
| `npm run format:check` | Check formatting without changing files             |
| `npm run lint`         | Run type-aware, React, and accessibility lint rules |
| `npm run typecheck`    | Check the TypeScript projects                       |
| `npm run build`        | Type-check and create a production build            |
| `npm run check`        | Run all merge-blocking quality checks               |
| `npm run preview`      | Preview the production build locally                |

## Source structure

```text
src/
├── api/          Application-specific backend configuration and endpoints
├── assets/       Images, fonts, and other imported assets
├── auth/         Project-specific auth wiring, user type, and configuration
├── components/   UI shared by multiple pages
├── hooks/        Hooks shared by multiple pages or unrelated components
├── lib/          Stable infrastructure supplied by the template
├── pages/        Route-level screens and the code they own
├── styles/       Application-wide reset, tokens, and global styles
├── App.tsx       Application shell
├── main.tsx      Browser entry point and global style imports
└── routes.tsx    Declarative React Router routes
```

Keep code with its page until it has a second genuine consumer. Move shared UI
to `components` and shared hooks to `hooks`. Do not use `lib` as a miscellaneous
helpers directory; read the README inside each architectural directory for its
specific contract.

## Styling

The template uses plain CSS and native CSS nesting. Global reset, design tokens,
and element defaults live in `src/styles`. CSS owned by a page or component is
placed beside its TSX file.

Use kebab-case class names with a recognizable component prefix:

```css
.project-card {
  & > .project-card-header {
    & > .project-card-title {
      margin: 0;
    }
  }

  &:hover {
    border-color: var(--color-brand);
  }

  &.is-selected {
    background: var(--color-surface-muted);
  }
}
```

Nesting should express relationships inside the component that owns the markup.
Avoid reaching through one component to style another component's internal
structure.

## API requests and static JSON

`src/lib/http` defines reusable request and error behavior. `src/api` configures
that client for the application and defines resource-specific endpoint
functions. Pages and components should call application API functions rather
than use `fetch` directly.

The starter loads `public/api-stubs/projects.json` through that API boundary.
This gives projects a documented read-only JSON strategy while a backend is
being built or when a small static dataset is sufficient. Set `VITE_API_URL` to
use a real backend and update resource paths to match its shape.

Static JSON stubs cannot persist mutations. Introduce a backend or dedicated
mock server when realistic create, update, delete, authentication, or error
behavior is needed.

## Authentication and SSO

The starter is wrapped in a cookie-backed authentication guard. It calls the
current-user endpoint when the app loads, renders the app after any successful
response, and redirects to SSO when the API returns `401`.

Project-specific defaults live in `src/auth/config.ts`:

```ts
export const authConfig = {
  currentUserPath: '/auth/me',
  loginUrl: 'https://sso.apsoprojects.org/auth/login',
}
```

When `VITE_API_URL` is unset, the starter uses `public/api-stubs/auth.json` so it
can run without a backend. Set `VITE_API_URL` to use `/auth/me`, or edit the
configuration if a backend uses paths such as `/auth`.

The library intentionally treats the current-user response as `unknown`. The
application integration defines `CurrentUser` beside its loader in
`src/auth/currentUser.ts`. Its `useCurrentUser()` hook exposes the typed result
to components, and matching sample data lives in
`public/api-stubs/auth.json`. Each project replaces that example with its own
response type.

```ts
type CurrentUser = {
  userId: string
  name: string
  email: string
}

const { state } = useCurrentUser()
```

The frontend never reads or stores the session token. The backend must set an
HttpOnly cookie, validate it on protected requests, handle the SSO callback and
decryption, and clear it during logout. It should return `401` for a missing or
expired session and `403` for an authenticated user without permission. A `401`
starts SSO; a `403` does not.

## React Compiler

React Compiler is enabled through Vite. It analyzes components and hooks at
build time and automatically reuses eligible values, calculations, JSX, and
child components when their inputs have not changed.

Write clear React first instead of adding `useMemo`, `useCallback`, or
`React.memo` preemptively. Those APIs remain available when referential identity
is part of a contract or profiling demonstrates a case that needs explicit
control. Components and hooks must continue to follow the Rules of React; the
compiler is an optimization and does not make impure code correct.

## State and optional libraries

Start with derived values, local state, lifted state, URL state, and narrowly
scoped context. The template intentionally does not include a global client-state
library.

TanStack Query is not a base dependency. Add it when an API-driven project needs
shared server data, caching, invalidation, polling, pagination, or background
refresh. Keep endpoint functions in `src/api` so the transport contract remains
separate from the chosen state library.

## Verification

Run the same checks as CI before opening a pull request:

```sh
npm run check
```

The template does not include a React test stack. Projects can add testing when
their behavior justifies it. 99% of our projects do not need a test framework, talk to a staff member if you think the project needs it.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for naming, placement, accessibility,
and completion expectations.
