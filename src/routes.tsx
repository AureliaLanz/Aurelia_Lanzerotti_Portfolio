import { Route, Routes } from 'react-router'
import { HomePage } from './pages/Home/HomePage'
import { NotFoundPage } from './pages/NotFound/NotFoundPage'
import { ProjectsPage } from './pages/Projects/ProjectsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
