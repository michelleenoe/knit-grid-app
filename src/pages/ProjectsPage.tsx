import { useMemo, useState } from "react";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { EmptyState } from "../components/common/EmptyState";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useAppStore } from "../app/store";
import { useNavigate } from "react-router-dom";

type FilterKey = "all" | "in-progress" | "finished";

const filterOptions: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in-progress", label: "In Progress" },
  { key: "finished", label: "Finished" },
];

export function ProjectsPage() {
  const projects = useAppStore((state) => state.projects);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.status === activeFilter);
  }, [activeFilter, projects]);

  return (
    <PageShell>
      <SectionTitle
        title="Projects"
        subtitle="Track rows, edit patterns, and keep your knitting projects in one place."
        action={
          <button
            type="button"
            aria-label="Create new project"
            className="btn btn--primary"
            onClick={() => navigate("/new")}
          >
            + New project
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
          title="No projects yet"
          description="Create your first knitting project to keep track of rows and notes."
          action={
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => navigate("/new")}
            >
              Start a project
            </button>
          }
        />
      )}
    </PageShell>
  );
}
