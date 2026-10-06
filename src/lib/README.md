# Template library

This directory contains stable infrastructure supplied by the Digital Corps
React template. Application code should normally consume these utilities rather
than duplicate or modify them.

Files under `lib` must not import from `api`, `components`, or `pages`. Change
the library intentionally when the shared infrastructure contract needs to
change.

Do not place project-specific endpoints, components, domain types, or
miscellaneous helpers here.

- `auth` contains reusable cookie-session state, guarding, and SSO redirect
  behavior without defining an application user type.
- `http` contains the reusable fetch wrapper and HTTP error contract.
