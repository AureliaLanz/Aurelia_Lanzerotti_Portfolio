import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from './AuthContext'

export function useAuth<User = unknown>() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth() must be used inside <AuthProvider>')
  }

  return context as AuthContextValue<User>
}
