import type { PatternGrid } from "../types/project";

export function resizePatternGrid(
  pattern: PatternGrid,
  nextRows: number,
  nextColumns: number
): PatternGrid {
  const safeRows = Math.max(1, nextRows);
  const safeColumns = Math.max(1, nextColumns);

  const nextCells = Array.from({ length: safeRows }, (_, rowIndex) =>
    Array.from({ length: safeColumns }, (_, columnIndex) => {
      return pattern.cells[rowIndex]?.[columnIndex] ?? "";
    })
  );

  return {
    rows: safeRows,
    columns: safeColumns,
    cells: nextCells,
  };
}

export function paintPatternCell(
  pattern: PatternGrid,
  rowIndex: number,
  columnIndex: number,
  color: string
): PatternGrid {
  return {
    ...pattern,
    cells: pattern.cells.map((row, currentRowIndex) =>
      row.map((cell, currentColumnIndex) => {
        if (currentRowIndex === rowIndex && currentColumnIndex === columnIndex) {
          return color;
        }

        return cell;
      })
    ),
  };
}

export type PatternCell = {
  row: number;
  column: number;
  symbol: string;
};

export function buildPatternGrid(lines: string[]): PatternCell[][] {
  const maxColumns = Math.max(
    1,
    ...lines.map((line) => line.length)
  );

  return lines.map((line, rowIndex) => {
    const padded = line.padEnd(maxColumns, " ");

    return Array.from({ length: maxColumns }, (_, columnIndex) => {
      const raw = padded[columnIndex] || " ";
      const trimmed = raw.trim();

      return {
        row: rowIndex,
        column: columnIndex,
        symbol: trimmed === "." ? "" : trimmed,
      };
    });
  });
}
