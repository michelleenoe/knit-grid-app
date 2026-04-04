import { useNavigate, useParams } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { PatternGrid } from "../components/knitting/PatternGrid";
import { useAppStore } from "../app/store";

export function KnittingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useAppStore((state) =>
    id ? state.getProjectById(id) : undefined
  );
  const incrementRow = useAppStore((state) => state.incrementRow);
  const decrementRow = useAppStore((state) => state.decrementRow);

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

          <div className="panel">
            <span className="panel__title">Project not found</span>
            <p className="form-field__hint">
              We could not load this knitting project at the moment.
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="page-actions">
          <button
            type="button"
            onClick={() => navigate(`/project/${project.id}`)}
            className="btn btn--ghost"
          >
            ← Back
          </button>
          <span className="status-pill">
            {project.knitMode === "round" ? "Round mode" : "Flat mode"}
          </span>
        </div>

        <div className="panel">
          <div>
            <p className="form-field__label" style={{ fontWeight: 600 }}>
              {project.name}
            </p>
            <h1 className="knitting-row-title">Row {project.currentRow}</h1>
            <p className="form-field__hint">
              Follow your pattern row by row. The active row is highlighted below.
            </p>
          </div>

          <div className="stat-grid">
            <StatCard label="Current" value={`Row ${project.currentRow}`} />
            <StatCard label="Total" value={`${project.totalRows} rows`} />
          </div>
        </div>

        <div className="panel">
          <PatternGrid pattern={project.pattern} activeRow={project.currentRow} />
        </div>
      </div>

      <div className="sticky-controls">
        <div className="control-grid">
          <button
            type="button"
            onClick={() => decrementRow(project.id)}
            disabled={project.currentRow <= 1}
            className="control-grid__button"
            style={{
              background:
                project.currentRow <= 1
                  ? "rgba(33, 23, 20, 0.08)"
                  : "rgba(255,255,255,0.72)",
              color:
                project.currentRow <= 1
                  ? "rgba(33, 23, 20, 0.45)"
                  : "var(--color-text)",
            }}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => incrementRow(project.id)}
            disabled={project.currentRow >= project.totalRows}
            className="control-grid__button"
            style={{
              background:
                project.currentRow >= project.totalRows
                  ? "rgba(33, 23, 20, 0.18)"
                  : "var(--color-text)",
              color: project.currentRow >= project.totalRows ? "white" : "white",
            }}
          >
            Next row
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
