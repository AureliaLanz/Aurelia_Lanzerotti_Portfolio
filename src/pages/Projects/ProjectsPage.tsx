import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { ProjectCard } from './ProjectCard'
import { ReactCompilerExample } from './ReactCompilerExample'
import { useProjects } from './useProjects'
import './ProjectsPage.css'

export function ProjectsPage() {
  useDocumentTitle('Projects | Digital Corps React Template')
  const { state, reload } = useProjects()

  return (
    <div className="projects-page">
      <PageHeader title="Example projects">
        <p>
          This page loads sample JSON through the same API interface a real
          backend would use.
        </p>
      </PageHeader>

      {state.status === 'loading' && (
        <p className="projects-page-message" role="status">
          Loading projects…
        </p>
      )}

      {state.status === 'error' && (
        <div className="projects-page-error" role="alert">
          <p>{state.message}</p>
          <button type="button" onClick={reload}>
            Try again
          </button>
        </div>
      )}

      {state.status === 'success' && state.projects.length === 0 && (
        <p className="projects-page-message">No projects are available.</p>
      )}

      {state.status === 'success' && state.projects.length > 0 && (
        <>
          <div className="projects-page-list">
            {state.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <ReactCompilerExample projects={state.projects} />
        </>
      )}
    </div>
  )
}
