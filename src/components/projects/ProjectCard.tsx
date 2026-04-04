import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import { useLocalization } from "../../localization/Localization";
import { ProjectPreview } from "./ProjectPreview";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const localization = useLocalization();
  const statusLabel = localization.statuses[project.status];
  return (
    <Link to={`/project/${project.id}`} className="project-card">
      <ProjectPreview project={project} />

      <div className="project-card__body">
        <div className="project-card__top">
          <h2 className="project-card__title">{project.name}</h2>
          <span className="project-card__chevron">›</span>
        </div>

        <div className="project-card__meta">
          <span>{statusLabel}</span>
          <span>{localization.labels.rowNumber(project.currentRow)}</span>
        </div>
      </div>
    </Link>
  );
}
