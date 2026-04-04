import { useMemo, useState } from "react";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { EmptyState } from "../components/common/EmptyState";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useAppStore } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../localization/Localization";

type FilterKey = "all" | "in-progress" | "finished";

export function ProjectsPage() {
  const localization = useLocalization();
  const projects = useAppStore((state) => state.projects);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const navigate = useNavigate();
  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: "all", label: localization.projects.filters.all },
    { key: "in-progress", label: localization.projects.filters.inProgress },
    { key: "finished", label: localization.projects.filters.finished },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.status === activeFilter);
  }, [activeFilter, projects]);

  return (
    <PageShell>
      <SectionTitle
        title={localization.projects.title}
        subtitle={localization.projects.subtitle}
        action={
          <button
            type="button"
            aria-label={localization.buttons.createProject}
            className="btn btn--primary"
            onClick={() => navigate("/new")}
          >
            + {localization.projects.newProject}
          </button>
        }
      />

      <div className="chip-group">
        {filterOptions.map((option) => {
          const isActive = option.key === activeFilter;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setActiveFilter(option.key)}
              className={`chip-group__item${
                isActive ? " chip-group__item--active" : ""
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={localization.projects.empty.title}
          description={localization.projects.empty.description}
          action={
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => navigate("/new")}
            >
              {localization.projects.empty.action}
            </button>
          }
        />
      )}
    </PageShell>
  );
}
