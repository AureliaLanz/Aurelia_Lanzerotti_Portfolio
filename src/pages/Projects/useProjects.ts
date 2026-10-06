import { useEffect, useState } from 'react'
import { getProjects, type Project } from '../../api/projects'

type ProjectsState =
  | { status: 'loading' }
  | { status: 'success'; projects: Project[] }
  | { status: 'error'; message: string }

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to load projects.'
}

export function useProjects() {
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState<ProjectsState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    // wait 3 seconds to simulate loading, then call the API
    const timeoutId = window.setTimeout(() => {
      void getProjects(controller.signal)
        .then((projects) => {
          // throw new Error('Simulated error') // Simulate an error
          setState({ status: 'success', projects })
        })
        .catch((error: unknown) => {
          if (!isAbortError(error)) {
            setState({ status: 'error', message: getErrorMessage(error) })
          }
        })
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [requestVersion])

  function reload() {
    setState({ status: 'loading' })
    setRequestVersion((version) => version + 1)
  }

  return { state, reload }
}
