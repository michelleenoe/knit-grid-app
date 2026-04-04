import type { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { EmptyState } from "../components/common/EmptyState";
import { ProjectPreview } from "../components/projects/ProjectPreview";
import { useLocalization } from "../localization/Localization";
import { useAppStore } from "../app/store";

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const localization = useLocalization();

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
            ← {localization.buttons.back}
          </button>

          <EmptyState
            title={localization.projectDetail.notFoundTitle}
            description={localization.projectDetail.notFoundDescription}
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
      localization.confirmations.deleteProject(activeProject.name)
    );

    if (!confirmed) return;

    deleteProject(activeProject.id);
    navigate("/");
  }

  const statusLabel = localization.statuses[activeProject.status];

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
            {localization.projectDetail.detailsHint}
          </p>

          <div className="stat-grid">
            <StatCard
              label={localization.projectDetail.stats.status}
              value={statusLabel}
            />
            <StatCard
              label={localization.projectDetail.stats.currentRow}
              value={localization.labels.rowNumber(activeProject.currentRow)}
            />
            <StatCard
              label={localization.projectDetail.stats.totalRows}
              value={localization.labels.rowsCount(activeProject.totalRows)}
            />
            <StatCard
              label={localization.projectDetail.stats.mode}
              value={
                activeProject.knitMode === "round"
                  ? localization.knitting.modeLabels.round
                  : localization.knitting.modeLabels.flat
              }
            />
          </div>

          <div className="page-actions">
            <Link
              to={`/project/${activeProject.id}/knit`}
              className="btn btn--primary"
            >
              {localization.buttons.openKnitMode}
            </Link>
            <Link
              to={`/project/${activeProject.id}/edit-pattern`}
              className="btn btn--secondary"
            >
              {localization.buttons.editPattern}
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">
              {localization.projectDetail.detailsTitle}
            </span>
          </div>

          <Field
            label={localization.projectDetail.fields.yarn}
            value={activeProject.yarn || ""}
            placeholder="e.g. Merino Wool, 4 ply"
            onChange={(value) => handleFieldChange("yarn", value)}
          />

          <Field
            label={localization.projectDetail.fields.needleSize}
            value={activeProject.needleSize || ""}
            placeholder="e.g. 3.5 mm"
            onChange={(value) => handleFieldChange("needleSize", value)}
          />

          <TextAreaField
            label={localization.projectDetail.fields.notes}
            value={activeProject.notes || ""}
            placeholder="Write any project notes here"
            onChange={(value) => handleFieldChange("notes", value)}
          />
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">
              {localization.projectDetail.dangerTitle}
            </span>
          </div>

          <p className="form-field__hint">
            {localization.projectDetail.dangerDescription}
          </p>

          <button
            type="button"
            onClick={handleDelete}
            className="btn btn--destructive"
          >
            {localization.buttons.deleteProject}
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
