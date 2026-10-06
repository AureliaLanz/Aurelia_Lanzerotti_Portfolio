import { Link } from 'react-router'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import './NotFoundPage.css'

export function NotFoundPage() {
  useDocumentTitle('Page not found | Digital Corps React Template')

  return (
    <div className="not-found-page">
      <PageHeader title="Page not found">
        <p>The page you requested does not exist.</p>
      </PageHeader>
      <Link to="/">Return home</Link>
    </div>
  )
}
