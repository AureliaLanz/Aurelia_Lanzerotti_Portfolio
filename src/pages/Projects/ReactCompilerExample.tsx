import { useState } from 'react'
import type { Project } from '../../api/projects'
import './ReactCompilerExample.css'

type ReactCompilerExampleProps = {
  projects: Project[]
}

function ProjectSummary({ projects }: ReactCompilerExampleProps) {
  const activeProjectCount = projects.filter(
    (project) => project.status === 'active',
  ).length
  const projectNames = projects.map((project) => project.name).join(', ')

  return (
    <div className="compiler-example-summary">
      <p>
        <strong>{projects.length}</strong> projects, including{' '}
        <strong>{activeProjectCount}</strong> active projects
      </p>
      <p>{projectNames}</p>
    </div>
  )
}

export function ReactCompilerExample({ projects }: ReactCompilerExampleProps) {
  const [unrelatedCount, setUnrelatedCount] = useState(0)

  function handleIncrement() {
    setUnrelatedCount((count) => count + 1)
  }

  return (
    <section
      className="compiler-example"
      aria-labelledby="compiler-example-title"
    >
      <h2 id="compiler-example-title">React Compiler example</h2>
      <p>
        The project data below never changes. Updating the unrelated counter
        rerenders this parent, but React Compiler can reuse the project summary.
      </p>

      <button type="button" onClick={handleIncrement}>
        Update unrelated counter: {unrelatedCount}
      </button>

      <ProjectSummary projects={projects} />

      <p>
        There is no <code>React.memo</code>, <code>useMemo</code>, or{' '}
        <code>useCallback</code> here. Open React DevTools and look for the Memo
        ✨ badge on these components.
      </p>
    </section>
  )
}
