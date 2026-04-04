import type { Project } from '../../types/project'

const insightTemplates = [
  {
    label: 'Active projects',
    getValue: (projects: Project[]) =>
      projects.filter((p) => p.status === 'in-progress').length,
  },
  {
    label: 'Completed',
    getValue: (projects: Project[]) =>
      projects.filter((p) => p.status === 'finished').length,
  },
  {
    label: 'Planning ahead',
    getValue: (projects: Project[]) =>
      projects.filter((p) => p.status === 'not-started').length,
  },
]

type InsightsHighlightsProps = {
  projects: Project[]
}

export function InsightsHighlights({ projects }: InsightsHighlightsProps) {
  return (
    <div className="insights-grid">
      {insightTemplates.map((insight) => (
        <div key={insight.label} className="insight-card">
          <strong>{insight.getValue(projects)}</strong>
          <p>{insight.label}</p>
        </div>
      ))}
    </div>
  )
}
