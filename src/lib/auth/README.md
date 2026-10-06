# Authentication library

This directory contains the reusable frontend wiring for cookie-backed SSO. It
does not define the shape of an application's user or perform SSO decryption.

- `AuthProvider` calls the application-provided current-user request.
- `AuthGuard` renders protected content after that request succeeds.
- `useAuth<User>()` lets each project supply its own user type.
- `createSsoRedirect` handles a `401` redirect once, even when several requests
  fail together.

Project-specific auth wiring, user types, paths, and the SSO login URL live in
`src/auth`. Start there when adapting auth for a new project.
