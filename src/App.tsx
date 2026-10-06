import { NavLink } from 'react-router'
import { useCurrentUser } from './auth/useCurrentUser'
import { AppRoutes } from './routes'
import './App.css'

function getNavLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'site-navigation-link is-active' : 'site-navigation-link'
}

export function App() {
  const { state: authState } = useCurrentUser()

  return (
    <div className="app">
      <header className="site-header">
        <div className="site-header-content">
          <NavLink className="site-name" to="/">
            Digital Corps React Template
          </NavLink>

          {authState.status === 'authenticated' && (
            <p className="site-user">
              Signed in as <strong>{authState.user.name}</strong>
              <span>{authState.user.email}</span>
            </p>
          )}

          <nav className="site-navigation" aria-label="Primary navigation">
            <ul className="site-navigation-list">
              <li>
                <NavLink className={getNavLinkClassName} end to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={getNavLinkClassName} to="/projects">
                  Projects
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <AppRoutes />
      </main>

      <footer className="site-footer">
        <p>This is a footer!</p>
      </footer>
    </div>
  )
}
