import { apiClient } from './client'

export type Project = {
  id: string
  name: string
  description: string
  status: 'active' | 'complete' | 'failed'
}

export function getProjects(signal?: AbortSignal) {
  return apiClient.get<Project[]>('/projects.json', { signal })
}
