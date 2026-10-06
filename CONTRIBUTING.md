# Contributing

## Place code by ownership

- Keep page-specific components, hooks, types, and helpers beside their page.
- Move a component to `src/components` when multiple pages use it.
- Move a hook to `src/hooks` when multiple pages or unrelated components use it.
- Put application endpoint paths and request/response types in `src/api`.
- Treat `src/lib` as stable infrastructure, not a miscellaneous code directory.
- Keep component and page CSS beside the TSX file that owns the markup.

Start page directories flat. Add subdirectories only when they make a growing
page easier to navigate.

## Naming

- Use PascalCase for React components, component directories, and pages.
- End page component names with `Page`.
- Use camelCase for hooks, utilities, and API modules.
- Begin hook names with `use`.
- Use kebab-case for CSS classes.
- Begin callback props with `on` and internal event handlers with `handle`.
- Avoid vague names such as `helpers`, `common`, and `misc`.

## Accessibility

Accessibility lint rules are part of the required checks, but linting cannot
prove that an interface is accessible. Use semantic HTML, associate labels with
form controls, preserve visible focus styles, and verify interactive work with a
keyboard. Accessibility is a shared responsibility. If you see an accessibility issue, fix it or document it.

## React Compiler

React Compiler automatically memoizes eligible components and hooks. Do not add
`useMemo`, `useCallback`, or `React.memo` by default. Use them when identity is
semantically important or profiling identifies a specific performance need.

Compiler optimization depends on components and hooks following the Rules of
React. Do not mutate props or values created outside the current render.

## Authentication

Edit `src/auth/config.ts` when a project uses different auth paths or an SSO
login URL. Do not add a shared user shape to `src/lib`; each application owns
the type returned by its current-user endpoint.

The backend must use `401` for missing or expired authentication and `403` for
insufficient permission. Frontend role checks may control what is visible, but
the backend must enforce authorization.

## Definition of done

- `npm run check` passes.
- The affected UI has been checked at appropriate mobile and desktop sizes.
- The affected interactions work with keyboard navigation.
- New accessibility warnings have been resolved.
- Loading, empty, error, and success states have been considered for API work.
