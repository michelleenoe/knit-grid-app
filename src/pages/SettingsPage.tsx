import type { ChangeEvent } from "react";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { useAppStore } from "../app/store";

export function SettingsPage() {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const resetProjects = useAppStore((state) => state.resetProjects);
  const projectsCount = useAppStore((state) => state.projects.length);

  function handleResetProjects() {
    const confirmed = window.confirm(
      "Reset all projects back to the sample data? This will remove your current saved changes."
    );

    if (!confirmed) return;

    resetProjects();
  }

  return (
    <PageShell>
      <SectionTitle
        title="Settings"
        subtitle="Adjust how the app behaves and set your preferred defaults for new projects."
      />

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">New project defaults</span>
        </div>

        <div className="grid-two">
          <label className="form-field">
            <span className="form-field__label">Default knit mode</span>
            <select
              value={settings.defaultKnitMode}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                updateSettings({
                  defaultKnitMode: event.target.value as "flat" | "round",
                })
              }
              className="select"
            >
              <option value="flat">Flat</option>
              <option value="round">Round</option>
            </select>
          </label>

          <label className="form-field">
            <span className="form-field__label">Default rows</span>
            <input
              type="number"
              min={1}
              max={200}
              value={settings.defaultRows}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateSettings({
                  defaultRows: Number(event.target.value),
                })
              }
              className="input"
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Default columns</span>
            <input
              type="number"
              min={1}
              max={200}
              value={settings.defaultColumns}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateSettings({
                  defaultColumns: Number(event.target.value),
                })
              }
              className="input"
            />
          </label>
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">Display</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <ToggleRow
            title="Show row numbers"
            description="Display row numbers next to the pattern grid."
            checked={settings.showRowNumbers}
            onChange={() =>
              updateSettings({
                showRowNumbers: !settings.showRowNumbers,
              })
            }
          />

          <ToggleRow
            title="Highlight active row"
            description="Emphasize the current working row in knitting mode."
            checked={settings.highlightActiveRow}
            onChange={() =>
              updateSettings({
                highlightActiveRow: !settings.highlightActiveRow,
              })
            }
          />
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">App data</span>
        </div>

        <div className="stat-card" style={{ padding: "24px", background: "rgba(255,255,255,0.6)" }}>
          <p className="form-field__hint" style={{ marginBottom: "6px" }}>
            Saved projects
          </p>
          <strong style={{ fontSize: "1.1rem" }}>{projectsCount}</strong>
        </div>

        <button
          type="button"
          onClick={handleResetProjects}
          className="btn btn--destructive"
        >
          Reset project data
        </button>
      </div>

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">About</span>
        </div>
        <p className="form-field__hint">
          Knit Grid is a personal knitting tracker for patterns, rows and project notes. This version is designed as a lightweight web app MVP.
        </p>
      </div>
    </PageShell>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="toggle-row">
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <strong>{title}</strong>
        <p className="form-field__hint">{description}</p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className="toggle-switch"
      >
        <span className="toggle-switch__thumb" />
      </button>
    </div>
  );
}
