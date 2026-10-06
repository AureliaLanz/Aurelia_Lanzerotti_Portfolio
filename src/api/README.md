# Application API

This directory describes how this application communicates with its backend.
The shared transport behavior lives in `src/lib/http`; resource-specific paths,
request types, and response types belong here.

- Configure the application client in `client.ts`.
- Group endpoint functions by backend resource, such as `projects.ts`.
- Import API functions from pages and hooks instead of calling `fetch` directly.
- Keep this directory flat until a resource is complex enough to need its own
  folder.

The starter client uses `public/api-stubs` when `VITE_API_URL` is not set. A
project with a backend should set `VITE_API_URL` and update resource paths to
match the real API.

Authentication is kept together in `src/auth`. It uses the same HTTP client,
but it does not belong beside application data endpoints such as projects.
