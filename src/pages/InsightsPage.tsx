import { PageShell } from "../components/common/PageShell";
import { useAppStore } from "../app/store";
import {
  getInProgressProjects,
  getMostAdvancedProject,
  getRowsCompletedToday,
  getTotalRowsCompleted,
  getWeeklyActivityMock,
} from "../utils/insights";

export function InsightsPage() {
  const projects = useAppStore((state) => state.projects);

  const rowsToday = getRowsCompletedToday(projects);
  const totalRows = getTotalRowsCompleted(projects);
  const activeProjects = getInProgressProjects(projects);
  const mostAdvancedProject = getMostAdvancedProject(projects);
  const weeklyActivity = getWeeklyActivityMock(rowsToday);

  const maxValue = Math.max(...weeklyActivity, 1);
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <PageShell>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p className="hero-card__label" style={{ fontWeight: 700 }}>
            PROGRESS
          </p>
          <h1 className="hero-card__title" style={{ marginBottom: 0 }}>
            Insights
          </h1>
          <p className="hero-card__subtitle">
            A calm view of your knitting progress and current rhythm.
          </p>
        </div>

        <div className="hero-card">
          <div className="hero-card__art">
            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "rgba(229, 205, 169, 0.18)",
                top: "-24px",
                right: "-28px",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "140px",
                height: "140px",
                borderRadius: "40% 60% 60% 40% / 45% 40% 60% 55%",
                background: "rgba(223, 75, 63, 0.15)",
                bottom: "-12px",
                left: "-8px",
              }}
            />
          </div>

          <div className="hero-card__content">
            <p className="hero-card__label" style={{ fontWeight: 700 }}>
              Today
            </p>
            <h2 className="hero-card__title">{rowsToday}</h2>
            <p className="hero-card__subtitle">
              Rows completed today across all your active knitting projects.
            </p>
          </div>
        </div>

        <div className="stat-grid">
          <InsightStatCard
            label="Total rows"
            value={`${totalRows}`}
            accent="var(--color-beige)"
          />
          <InsightStatCard
            label="In progress"
            value={`${activeProjects}`}
            accent="var(--color-peach)"
          />
        </div>

        <div className="panel--dark">
          <div className="panel__header">
            <span className="panel__title">Weekly activity</span>
          </div>
          <p className="form-field__hint">
            A simple look at your current knitting rhythm.
          </p>

          <div className="weekly-chart">
            {weeklyActivity.map((value, index) => {
              const height = `${Math.max(16, (value / maxValue) * 100)}%`;

              return (
                <div
                  key={`${dayLabels[index]}-${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    title={`${value} rows`}
                    className="weekly-chart__bar"
                    style={{
                      height,
                      minHeight: "16px",
                      background:
                        index % 2 === 0
                          ? "var(--color-red)"
                          : "var(--color-beige)",
                    }}
                  />
                  <span className="weekly-chart__label">
                    {dayLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel--dark">
          <div className="panel__header">
            <span className="panel__title">Most advanced project</span>
          </div>
          <p className="form-field__hint">
            The project currently furthest along in your collection.
          </p>

          {mostAdvancedProject ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                padding: "18px",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2rem",
                    lineHeight: 0.95,
                    color: "white",
                    margin: 0,
                  }}
                >
                  {mostAdvancedProject.name}
                </h3>

                <span
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                  }}
                >
                  Row {mostAdvancedProject.currentRow}
                </span>
              </div>

              <div
                style={{
                  height: "12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      mostAdvancedProject.totalRows
                        ? (mostAdvancedProject.currentRow /
                            mostAdvancedProject.totalRows) *
                          100
                        : 0
                    }%`,
                    height: "100%",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, var(--color-red), var(--color-beige))",
                  }}
                />
              </div>

              <p className="form-field__hint">
                {mostAdvancedProject.currentRow} of{" "}
                {mostAdvancedProject.totalRows} rows completed.
              </p>
            </div>
          ) : (
            <p className="form-field__hint">No project data available yet.</p>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function InsightStatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="stat-card stat-card--dark">
      <span>{label}</span>
      <strong
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "2.5rem",
          lineHeight: 0.9,
          color: accent,
        }}
      >
        {value}
      </strong>
    </div>
  );
}
