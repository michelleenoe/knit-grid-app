import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import { ProjectPreview } from "./ProjectPreview";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

const statusLabelMap: Record<Project["status"], string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  finished: "Finished",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/project/${project.id}`} className="project-card">
      <ProjectPreview project={project} />

      <div className="project-card__body">
        <div className="project-card__top">
          <h2 className="project-card__title">{project.name}</h2>
          <span className="project-card__chevron">›</span>
        </div>

        <div className="project-card__meta">
          <span>{statusLabelMap[project.status]}</span>
          <span>Row {project.currentRow}</span>
        </div>
      </div>
    </Link>
  );
}