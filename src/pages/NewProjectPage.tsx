import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { useAppStore } from "../app/store";

export function NewProjectPage() {
  const navigate = useNavigate();
  const createProject = useAppStore((state) => state.createProject);

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
        title="Create project"
        subtitle="Set up your rows, columns, and preferred knit mode before you begin."
      />

      <div className="panel">
        <form onSubmit={handleSubmit} className="form">
          <label className="form-field">
            <span className="form-field__label">Project name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My sweater"
              className="input"
            />
            <span className="form-field__hint">
              A descriptive name helps keep your projects organized.
            </span>
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            <label className="form-field">
              <span className="form-field__label">Rows</span>
              <input
                type="number"
                min={1}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="input"
              />
            </label>

            <label className="form-field">
              <span className="form-field__label">Columns</span>
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
            <span className="form-field__label">Knit mode</span>
            <select
              value={knitMode}
              onChange={(e) => setKnitMode(e.target.value as "flat" | "round")}
              className="select"
            >
              <option value="flat">Flat</option>
              <option value="round">Round</option>
            </select>
          </label>

          <div className="page-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!name.trim()}
            >
              Create project
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
