import { useEffect, useState, type ReactNode } from 'react'
import { HttpError } from '../http/HttpError'
import { AuthContext, type AuthState } from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
  loadUser: (signal: AbortSignal) => Promise<unknown>
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function getError(error: unknown) {
  return error instanceof Error
    ? error
    : new Error('Unable to verify the current session.')
}

export function AuthProvider({ children, loadUser }: AuthProviderProps) {
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState<AuthState>({
    status: 'loading',
    user: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    loadUser(controller.signal)
      .then((user) => {
        setState({ status: 'authenticated', user, error: null })
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        if (error instanceof HttpError && error.status === 401) {
          setState({ status: 'redirecting', user: null, error: null })
          return
        }

        setState({ status: 'error', user: null, error: getError(error) })
      })

    return () => {
      controller.abort()
    }
  }, [loadUser, requestVersion])

  function reloadUser() {
    setState({ status: 'loading', user: null, error: null })
    setRequestVersion((version) => version + 1)
  }

  return (
    <AuthContext.Provider value={{ state, reloadUser }}>
      {children}
    </AuthContext.Provider>
  )
}
