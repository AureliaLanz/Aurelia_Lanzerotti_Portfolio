import type { Project } from '../../api/projects'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <h2 className="project-card-title">{project.name}</h2>
        <span className={`project-card-status is-${project.status}`}>
          {project.status}
        </span>
      </div>
      <p className="project-card-description">{project.description}</p>
    </article>
  )
}
