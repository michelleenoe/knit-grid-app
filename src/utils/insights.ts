import type { Project } from "../types/project";

export function getRowsCompletedToday(projects: Project[]) {
  return projects.reduce((sum, project) => sum + project.rowsCompletedToday, 0);
}

export function getTotalRowsCompleted(projects: Project[]) {
  return projects.reduce((sum, project) => sum + project.totalRowsCompleted, 0);
}

export function getInProgressProjects(projects: Project[]) {
  return projects.filter((project) => project.status === "in-progress").length;
}

export function getMostAdvancedProject(projects: Project[]) {
  if (!projects.length) return undefined;

  return [...projects].sort((a, b) => {
    const aProgress = a.totalRows ? a.currentRow / a.totalRows : 0;
    const bProgress = b.totalRows ? b.currentRow / b.totalRows : 0;
    return bProgress - aProgress;
  })[0];
}

export function getWeeklyActivityMock(totalToday: number) {
  const base = Math.max(1, totalToday);

  return [
    Math.max(0, base - 3),
    Math.max(0, base - 1),
    Math.max(0, base - 2),
    base,
    Math.max(0, base - 4),
    Math.max(0, base - 1),
    Math.max(0, base - 2),
  ];
}