import { apiClient } from '../api/client'
import { authConfig } from './config'

// This is the starter templates current user response.
// Replace it with the shape returned by the project's backend.
export type CurrentUser = {
  userId: string
  name: string
  email: string
}

export function loadCurrentUser(signal: AbortSignal) {
  return apiClient.get<CurrentUser>(authConfig.currentUserPath, { signal })
}
