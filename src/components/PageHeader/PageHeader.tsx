import type { ReactNode } from 'react'
import './PageHeader.css'

type PageHeaderProps = {
  children?: ReactNode
  title: string
}

export function PageHeader({ children, title }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1 className="page-header-title">{title}</h1>
      {children && <div className="page-header-content">{children}</div>}
    </header>
  )
}
