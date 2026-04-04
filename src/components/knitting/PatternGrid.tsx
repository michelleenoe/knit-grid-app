import "./PatternGrid.css";

import type { PatternGrid as PatternGridType } from "../../types/project";

type PatternGridProps = {
  pattern: PatternGridType;
  activeRow?: number;
};

export function PatternGrid({ pattern, activeRow }: PatternGridProps) {
  return (
    <div className="pattern-grid">
      {pattern.cells.map((row, rowIndex) => {
        const rowNumber = rowIndex + 1;
        const isActive = activeRow === rowNumber;

        return (
          <div
            key={rowIndex}
            className={`pattern-grid__row${
              isActive ? " pattern-grid__row--active" : ""
            }`}
            style={{
              gridTemplateColumns: `36px repeat(${pattern.columns}, minmax(0, 1fr))`,
            }}
          >
            <div
              className="pattern-grid__row-number"
              style={{ fontWeight: isActive ? 700 : 500 }}
            >
              {rowNumber}
            </div>

            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                aria-hidden="true"
                className="pattern-grid__cell"
                style={{ background: cell || "#F0E9DF" }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
