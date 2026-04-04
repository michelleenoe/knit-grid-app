import type { ChangeEvent } from "react";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { useLocalization } from "../localization/Localization";
import type { Language } from "../localization/Localization";
import { useAppStore } from "../app/store";

export function SettingsPage() {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const resetProjects = useAppStore((state) => state.resetProjects);
  const projectsCount = useAppStore((state) => state.projects.length);
  const localization = useLocalization();
  const languages: Language[] = ["en", "da"];

  function handleResetProjects() {
    const confirmed = window.confirm(localization.confirmations.resetProjects);

    if (!confirmed) return;

    resetProjects();
  }

  return (
    <PageShell>
      <SectionTitle
        title={localization.settings.pageTitle}
        subtitle={localization.settings.pageSubtitle}
      />

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">
            {localization.settings.projectDefaultsTitle}
          </span>
        </div>

        <div className="grid-two">
          <label className="form-field">
            <span className="form-field__label">
              {localization.newProject.fields.knitMode}
            </span>
            <select
              value={settings.defaultKnitMode}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                updateSettings({
                  defaultKnitMode: event.target.value as "flat" | "round",
                })
              }
              className="select"
            >
              <option value="flat">
                {localization.knitting.modeLabels.flat}
              </option>
              <option value="round">
                {localization.knitting.modeLabels.round}
              </option>
            </select>
          </label>

          <label className="form-field">
            <span className="form-field__label">
              {localization.newProject.fields.rows}
            </span>
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
            <span className="form-field__label">
              {localization.newProject.fields.columns}
            </span>
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
          <span className="panel__title">
            {localization.settings.displayTitle}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <ToggleRow
            title={localization.settings.toggles.showRowNumbers.title}
            description={
              localization.settings.toggles.showRowNumbers.description
            }
            checked={settings.showRowNumbers}
            onChange={() =>
              updateSettings({
                showRowNumbers: !settings.showRowNumbers,
              })
            }
          />

          <ToggleRow
            title={localization.settings.toggles.highlightActiveRow.title}
            description={
              localization.settings.toggles.highlightActiveRow.description
            }
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
          <span className="panel__title">
            {localization.settings.languageTitle}
          </span>
        </div>

        <p className="form-field__hint">
          {localization.settings.languageDescription}
        </p>

        <label className="form-field">
          <span className="form-field__label">
            {localization.settings.languageLabel}
          </span>
          <select
            value={settings.language}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              updateSettings({
                language: event.target.value as Language,
              })
            }
            className="select"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {localization.languageOptions[lang]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">
            {localization.settings.appDataTitle}
          </span>
        </div>

        <div className="stat-card" style={{ padding: "24px", background: "rgba(255,255,255,0.6)" }}>
          <p className="form-field__hint" style={{ marginBottom: "6px" }}>
            {localization.settings.savedProjectsLabel}
          </p>
          <strong style={{ fontSize: "1.1rem" }}>{projectsCount}</strong>
        </div>

        <button
          type="button"
          onClick={handleResetProjects}
          className="btn btn--destructive"
        >
          {localization.buttons.resetProjects}
        </button>
      </div>

      <div className="panel">
        <div className="panel__header">
          <span className="panel__title">
            {localization.settings.aboutTitle}
          </span>
        </div>
        <p className="form-field__hint">
          {localization.settings.aboutDescription}
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
