import type { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { EmptyState } from "../components/common/EmptyState";
import { ProjectPreview } from "../components/projects/ProjectPreview";
import { useAppStore } from "../app/store";

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useAppStore((state) =>
    id ? state.getProjectById(id) : undefined
  );
  const updateProject = useAppStore((state) => state.updateProject);
  const deleteProject = useAppStore((state) => state.deleteProject);

  if (!project || !id) {
    return (
      <PageShell>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn--ghost"
          >
            ← Back
          </button>

          <EmptyState
            title="Project not found"
            description="This project does not exist or has been deleted."
          />
        </div>
      </PageShell>
    );
  }

  const activeProject = project;

  function handleFieldChange(
    field: "name" | "yarn" | "needleSize" | "notes",
    value: string
  ) {
    updateProject(activeProject.id, { [field]: value });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${activeProject.name}"? This cannot be undone.`
    );

    if (!confirmed) return;

    deleteProject(activeProject.id);
    navigate("/");
  }

  const statusLabel =
    activeProject.status === "not-started"
      ? "Not started"
      : activeProject.status === "in-progress"
      ? "In progress"
      : "Finished";

  return (
    <PageShell>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div className="page-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn--ghost"
          >
            ← Back
          </button>
        </div>

        <div className="panel">
          <ProjectPreview project={activeProject} />

          <div className="panel__header">
            <input
              value={activeProject.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleFieldChange("name", event.target.value)
              }
              aria-label="Project name"
              className="project-title-input"
            />
            <div className="panel__meta">
              <span>{statusLabel}</span>
              <span>Row {activeProject.currentRow}</span>
            </div>
          </div>

          <p className="form-field__hint">
            Keep all your project details and row progress in one place.
          </p>

          <div className="stat-grid">
            <StatCard label="Status" value={statusLabel} />
            <StatCard label="Current row" value={`Row ${activeProject.currentRow}`} />
            <StatCard label="Total rows" value={`${activeProject.totalRows}`} />
            <StatCard
              label="Mode"
              value={activeProject.knitMode === "round" ? "Round" : "Flat"}
            />
          </div>

          <div className="page-actions">
            <Link to={`/project/${activeProject.id}/knit`} className="btn btn--primary">
              Open knitting mode
            </Link>
            <Link
              to={`/project/${activeProject.id}/edit-pattern`}
              className="btn btn--secondary"
            >
              Edit pattern
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">Project details</span>
          </div>

          <Field
            label="Yarn"
            value={activeProject.yarn || ""}
            placeholder="e.g. Merino Wool, 4 ply"
            onChange={(value) => handleFieldChange("yarn", value)}
          />

          <Field
            label="Needle size"
            value={activeProject.needleSize || ""}
            placeholder="e.g. 3.5 mm"
            onChange={(value) => handleFieldChange("needleSize", value)}
          />

          <TextAreaField
            label="Notes"
            value={activeProject.notes || ""}
            placeholder="Write any project notes here"
            onChange={(value) => handleFieldChange("notes", value)}
          />
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">Danger zone</span>
          </div>

          <p className="form-field__hint">
            Delete this project if you no longer need it.
          </p>

          <button
            type="button"
            onClick={handleDelete}
            className="btn btn--destructive"
          >
            Delete project
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="input"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="textarea"
      />
    </label>
  );
}
