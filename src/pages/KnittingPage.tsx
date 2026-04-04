import { useNavigate, useParams } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { PatternGrid } from "../components/knitting/PatternGrid";
import { useAppStore } from "../app/store";
import { useLocalization } from "../localization/Localization";

export function KnittingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const localization = useLocalization();

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
            ← {localization.buttons.back}
          </button>

          <div className="panel">
            <span className="panel__title">
              {localization.knitting.missingTitle}
            </span>
            <p className="form-field__hint">
              {localization.knitting.missingDescription}
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
            ← {localization.buttons.back}
          </button>
          <span className="status-pill">
            {project.knitMode === "round"
              ? localization.knitting.modeLabels.round
              : localization.knitting.modeLabels.flat}
          </span>
        </div>

        <div className="panel">
          <div>
            <p className="form-field__label" style={{ fontWeight: 600 }}>
              {project.name}
            </p>
            <h1 className="knitting-row-title">
              {localization.labels.rowNumber(project.currentRow)}
            </h1>
            <p className="form-field__hint">
              {localization.knitting.followHint}
            </p>
          </div>

          <div className="stat-grid">
            <StatCard
              label={localization.knitting.stats.current}
              value={localization.labels.rowNumber(project.currentRow)}
            />
            <StatCard
              label={localization.knitting.stats.total}
              value={localization.labels.rowsCount(project.totalRows)}
            />
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
            {localization.knitting.buttons.previous}
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
            {localization.knitting.buttons.next}
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
