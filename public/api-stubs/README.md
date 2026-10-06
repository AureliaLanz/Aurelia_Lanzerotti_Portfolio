# API stubs

These files provide read-only sample responses for development and for projects
that do not yet have a backend.

Application code should access these files through functions in `src/api`, not
fetch them directly from pages or components. Keep stub response shapes aligned
with the expected real API.

Static JSON cannot persist create, update, or delete operations. Use a backend
or a dedicated mock server when a project needs realistic mutations or complex
request behavior. Never include secrets, private information, or sensitive production
data in these files.

`auth.json` demonstrates a small application-owned current-user response. Its
shape is not a library contract. Replace both the stub and `CurrentUser` in
`src/auth/currentUser.ts` with the project's actual response.
