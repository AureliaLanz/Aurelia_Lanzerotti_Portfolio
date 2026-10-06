import type { ReactNode } from 'react'
import { AuthGuard } from '../lib/auth/AuthGuard'
import { AuthProvider } from '../lib/auth/AuthProvider'
import { loadCurrentUser } from './currentUser'

export function AppSSOAuth({ children }: { children: ReactNode }) {
  return (
    <AuthProvider loadUser={loadCurrentUser}>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  )
}
