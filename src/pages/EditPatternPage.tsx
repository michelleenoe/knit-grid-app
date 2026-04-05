import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageShell } from "../components/common/PageShell";
import { EmptyState } from "../components/common/EmptyState";
import { useLocalization } from "../localization/Localization";
import { useAppStore } from "../app/store";
import { paintPatternCell, resizePatternGrid } from "../utils/pattern";

type EditorTool = "draw" | "erase";

export function EditPatternPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const localization = useLocalization();

  const project = useAppStore((state) =>
    id ? state.getProjectById(id) : undefined
  );
  const updatePattern = useAppStore((state) => state.updatePattern);

  const [activeColor, setActiveColor] = useState(
    project?.palette?.[0] || "#DF4B3F"
  );
  const [activeTool, setActiveTool] = useState<EditorTool>("draw");
  const [rowsInput, setRowsInput] = useState(project?.pattern.rows ?? 20);
  const [columnsInput, setColumnsInput] = useState(
    project?.pattern.columns ?? 20
  );

  const safePalette = useMemo(() => {
    if (!project?.palette?.length) {
      return ["#EFC7BA", "#DF4B3F", "#355FBE", "#E5CDA9", "#3A2320"];
    }

    return project.palette;
  }, [project]);

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
            title={localization.patternEditor.missingTitle}
            description={localization.patternEditor.missingDescription}
          />
        </div>
      </PageShell>
    );
  }

  const activeProject = project;

  function handleCellClick(rowIndex: number, columnIndex: number) {
    const nextColor = activeTool === "erase" ? "" : activeColor;

    const nextPattern = paintPatternCell(
      activeProject.pattern,
      rowIndex,
      columnIndex,
      nextColor
    );

    updatePattern(activeProject.id, nextPattern);
  }

  function handleResize() {
    const nextPattern = resizePatternGrid(
      activeProject.pattern,
      Number(rowsInput),
      Number(columnsInput)
    );

    updatePattern(activeProject.id, nextPattern);
  }

  return (
    <PageShell>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="page-actions">
          <button
            type="button"
            onClick={() => navigate(`/project/${activeProject.id}`)}
            className="btn btn--ghost"
          >
            ← {localization.buttons.back}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/project/${activeProject.id}/knit`)}
            className="btn btn--secondary"
          >
            {localization.buttons.openKnitMode}
          </button>
        </div>

        <div className="panel">
          <div className="panel__header">
            <div>
              <p className="form-field__label">{activeProject.name}</p>
              <h1 className="panel__title">
                {localization.patternEditor.editTitle}
              </h1>
              <p className="form-field__hint">
                {localization.patternEditor.editHint}
              </p>
            </div>
            <div className="panel__meta">
              <span>
                {activeProject.pattern.rows}{" "}
                {localization.patternEditor.rows.toLowerCase()}
              </span>
              <span>
                {activeProject.pattern.columns}{" "}
                {localization.patternEditor.columns.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">
              {localization.patternEditor.toolsTitle}
            </span>
          </div>
          <div className="page-actions">
            <ToolButton
              label={localization.patternEditor.toolLabels.draw}
              active={activeTool === "draw"}
              onClick={() => setActiveTool("draw")}
            />
            <ToolButton
              label={localization.patternEditor.toolLabels.erase}
              active={activeTool === "erase"}
              onClick={() => setActiveTool("erase")}
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">
              {localization.patternEditor.paletteTitle}
            </span>
          </div>
          <div className="page-actions">
            {safePalette.map((color) => {
              const isActive = activeColor === color;

              return (
                <button
                  key={color}
                  type="button"
                  aria-label={`${localization.patternEditor.selectColor} ${color}`}
                  onClick={() => {
                    setActiveTool("draw");
                    setActiveColor(color);
                  }}
                  className={`palette-swatch${
                    isActive ? " palette-swatch--active" : ""
                  }`}
                  style={{ background: color }}
                />
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">
              {localization.patternEditor.resizeTitle}
            </span>
          </div>

          <div className="grid-two">
            <label className="form-field">
              <span className="form-field__label">
                {localization.patternEditor.rows}
              </span>
              <input
                type="number"
                min={1}
                max={200}
                value={rowsInput}
                onChange={(event) => setRowsInput(Number(event.target.value))}
                className="input"
              />
            </label>

            <label className="form-field">
              <span className="form-field__label">
                {localization.patternEditor.columns}
              </span>
              <input
                type="number"
                min={1}
                max={200}
                value={columnsInput}
                onChange={(event) => setColumnsInput(Number(event.target.value))}
                className="input"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleResize}
            className="btn btn--primary"
          >
            {localization.buttons.applySize}
          </button>
        </div>

        <div className="panel">
          <div className="panel__header">
            <span className="panel__title">
              {localization.patternEditor.gridTitle}
            </span>
          </div>

          <div
            style={{
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "6px",
                minWidth: "max-content",
              }}
            >
              {activeProject.pattern.cells.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `36px repeat(${activeProject.pattern.columns}, 28px)`,
                    gap: "6px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      color: "var(--color-muted)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {rowIndex + 1}
                  </div>

                  {row.map((cell, columnIndex) => (
                    <button
                      key={`${rowIndex}-${columnIndex}`}
                      type="button"
                      onClick={() => handleCellClick(rowIndex, columnIndex)}
                      aria-label={localization.patternEditor.cellLabel(
                        rowIndex + 1,
                        columnIndex + 1
                      )}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "9px",
                        background: cell || "#F0E9DF",
                        border: "1px solid rgba(33, 23, 20, 0.08)",
                        boxShadow:
                          activeTool === "draw" && cell === activeColor
                            ? "inset 0 0 0 1px rgba(255,255,255,0.35)"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function ToolButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tool-button${active ? " tool-button--active" : ""}`}
    >
      {label}
    </button>
  );
}
