import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { sampleProjects } from "../data/sampleProjects";
import type {
  AppSettings,
  PatternGrid,
  Project,
  KnitMode,
} from "../types/project";

type CreateProjectInput = {
  name: string;
  rows: number;
  columns: number;
  knitMode: KnitMode;
  palette: string[];
};

type AppState = {
  projects: Project[];
  settings: AppSettings;
  createProject: (input: CreateProjectInput) => Project;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  resetProjects: () => void;
  setCurrentRow: (projectId: string, row: number) => void;
  incrementRow: (projectId: string) => void;
  decrementRow: (projectId: string) => void;
  updatePattern: (projectId: string, pattern: PatternGrid) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  getProjectById: (projectId: string) => Project | undefined;
};

function createEmptyGrid(rows: number, columns: number): string[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => "")
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function generateProjectId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

const defaultSettings: AppSettings = {
  defaultKnitMode: "flat",
  defaultRows: 20,
  defaultColumns: 20,
  showRowNumbers: true,
  highlightActiveRow: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: sampleProjects,
      settings: defaultSettings,

      createProject: (input) => {
        const now = new Date().toISOString();

        const newProject: Project = {
          id: generateProjectId(),
          name: input.name,
          status: "not-started",
          currentRow: 1,
          totalRows: input.rows,
          knitMode: input.knitMode,
          palette: input.palette,
          pattern: {
            rows: input.rows,
            columns: input.columns,
            cells: createEmptyGrid(input.rows, input.columns),
          },
          yarn: "",
          needleSize: "",
          notes: "",
          createdAt: now,
          updatedAt: now,
          rowsCompletedToday: 0,
          totalRowsCompleted: 0,
        };

        set((state) => ({
          projects: [newProject, ...state.projects],
        }));

        return newProject;
      },

      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }));
      },

      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== projectId),
        }));
      },

      resetProjects: () => {
        set(() => ({
          projects: sampleProjects,
        }));
      },

      setCurrentRow: (projectId, row) => {
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) return project;

            const nextRow = clamp(row, 1, project.totalRows);

            return {
              ...project,
              currentRow: nextRow,
              status:
                nextRow >= project.totalRows
                  ? "finished"
                  : nextRow > 1
                  ? "in-progress"
                  : "not-started",
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      incrementRow: (projectId) => {
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) return project;

            const nextRow = clamp(project.currentRow + 1, 1, project.totalRows);
            const movedForward = nextRow > project.currentRow;

            return {
              ...project,
              currentRow: nextRow,
              status:
                nextRow >= project.totalRows ? "finished" : "in-progress",
              rowsCompletedToday: movedForward
                ? project.rowsCompletedToday + 1
                : project.rowsCompletedToday,
              totalRowsCompleted: movedForward
                ? project.totalRowsCompleted + 1
                : project.totalRowsCompleted,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      decrementRow: (projectId) => {
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) return project;

            const nextRow = clamp(project.currentRow - 1, 1, project.totalRows);

            return {
              ...project,
              currentRow: nextRow,
              status:
                nextRow <= 1
                  ? "not-started"
                  : nextRow >= project.totalRows
                  ? "finished"
                  : "in-progress",
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      updatePattern: (projectId, pattern) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  pattern,
                  totalRows: pattern.rows,
                  currentRow: clamp(project.currentRow, 1, pattern.rows),
                  updatedAt: new Date().toISOString(),
                }
              : project
          ),
        }));
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...updates,
          },
        }));
      },

      getProjectById: (projectId) => {
        return get().projects.find((project) => project.id === projectId);
      },
    }),
    {
      name: "knit-grid-app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projects: state.projects,
        settings: state.settings,
      }),
    }
  )
);