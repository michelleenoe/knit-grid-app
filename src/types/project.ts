export type CellColor = string;

export type PatternGrid = {
  rows: number;
  columns: number;
  cells: CellColor[][];
};

export type ProjectStatus = "not-started" | "in-progress" | "finished";
export type KnitMode = "flat" | "round";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  currentRow: number;
  totalRows: number;
  knitMode: KnitMode;
  palette: string[];
  pattern: PatternGrid;
  yarn?: string;
  needleSize?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  rowsCompletedToday: number;
  totalRowsCompleted: number;
};

export type AppSettings = {
  defaultKnitMode: KnitMode;
  defaultRows: number;
  defaultColumns: number;
  showRowNumbers: boolean;
  highlightActiveRow: boolean;
};