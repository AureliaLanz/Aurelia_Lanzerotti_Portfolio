import { createContext } from 'react'

export type AuthState<User = unknown> =
  | { status: 'loading'; user: null; error: null }
  | { status: 'authenticated'; user: User; error: null }
  | { status: 'redirecting'; user: null; error: null }
  | { status: 'error'; user: null; error: Error }

export type AuthContextValue<User = unknown> = {
  state: AuthState<User>
  reloadUser: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
