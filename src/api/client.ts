import { authConfig } from '../auth/config'
import { createSsoRedirect } from '../lib/auth/createSsoRedirect'
import { createHttpClient } from '../lib/http/createHttpClient'

const stubApiUrl = `${import.meta.env.BASE_URL}api-stubs`
const redirectToSso = createSsoRedirect(authConfig.loginUrl)

export const apiClient = createHttpClient({
  baseUrl: import.meta.env.VITE_API_URL?.trim() || stubApiUrl,
  credentials: 'include',
  onUnauthorized: redirectToSso,
})
