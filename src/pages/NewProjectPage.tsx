import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { useAppStore } from "../app/store";
import { useLocalization } from "../localization/Localization";

export function NewProjectPage() {
  const navigate = useNavigate();
  const createProject = useAppStore((state) => state.createProject);
  const localization = useLocalization();

  const [name, setName] = useState("");
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState(20);
  const [knitMode, setKnitMode] = useState<"flat" | "round">("flat");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    const newProject = createProject({
      name,
      rows,
      columns,
      knitMode,
      palette: ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D"],
    });

    navigate(`/project/${newProject.id}`);
  }

  return (
    <PageShell>
      <SectionTitle
        title={localization.newProject.title}
        subtitle={localization.newProject.subtitle}
      />

      <div className="panel">
        <form onSubmit={handleSubmit} className="form">
          <label className="form-field">
            <span className="form-field__label">
              {localization.newProject.fields.name}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={localization.newProject.placeholders.name}
              className="input"
            />
            <span className="form-field__hint">{localization.newProject.hint}</span>
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            <label className="form-field">
              <span className="form-field__label">
                {localization.newProject.fields.rows}
              </span>
              <input
                type="number"
                min={1}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
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
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                className="input"
              />
            </label>
          </div>

          <label className="form-field">
            <span className="form-field__label">
              {localization.newProject.fields.knitMode}
            </span>
            <select
              value={knitMode}
              onChange={(e) => setKnitMode(e.target.value as "flat" | "round")}
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

          <div className="page-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!name.trim()}
            >
              {localization.buttons.createProject}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => navigate("/")}
            >
              {localization.buttons.cancel}
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
