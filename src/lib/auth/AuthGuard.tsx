import type { ReactNode } from 'react'
import { useAuth } from './useAuth'

type AuthGuardProps = {
  children: ReactNode
  error?: (error: Error) => ReactNode
  loading?: ReactNode
}

export function AuthGuard({ children, error, loading }: AuthGuardProps) {
  const { state } = useAuth()
  const loadingFallback = loading ?? <p role="status">Checking your session…</p>

  if (state.status === 'loading' || state.status === 'redirecting') {
    return <>{loadingFallback}</>
  }

  if (state.status === 'error') {
    return (
      <>
        {error ? (
          error(state.error)
        ) : (
          <p role="alert">
            Unable to verify your session. Please refresh and try again.
          </p>
        )}
      </>
    )
  }

  return <>{children}</>
}
