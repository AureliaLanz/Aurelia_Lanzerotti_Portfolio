import { Link } from 'react-router'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import './HomePage.css'

export function HomePage() {
  useDocumentTitle('Home | Digital Corps React Template')

  return (
    <div className="home-page">
      <PageHeader title="Home Page">
        <p>This is the home page!</p>
      </PageHeader>

      <section className="home-page-content" aria-labelledby="home-page-title">
        <h2 id="home-page-title">
          Check out the readme and contributing.md files!
        </h2>
      </section>

      <Link className="home-page-action" to="/projects">
        View the API example
      </Link>
    </div>
  )
}
