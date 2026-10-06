import { useAuth } from '../lib/auth/useAuth'
import type { CurrentUser } from './currentUser'

export function useCurrentUser() {
  return useAuth<CurrentUser>()
}
