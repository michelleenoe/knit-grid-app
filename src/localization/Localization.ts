import { useAppStore } from "../app/store";
import type { ProjectStatus } from "../types/project";

export type Language = "en" | "da";

type ProjectsStrings = {
  title: string;
  subtitle: string;
  newProject: string;
  filters: {
    all: string;
    inProgress: string;
    finished: string;
  };
  empty: {
    title: string;
    description: string;
    action: string;
  };
};

type LibraryStrings = {
  title: string;
  subtitle: string;
  filters: {
    all: string;
    stitches: string;
    techniques: string;
    patterns: string;
    saved: string;
  };
  empty: {
    title: string;
    description: string;
  };
};

type NewProjectStrings = {
  title: string;
  subtitle: string;
  hint: string;
  fields: {
    name: string;
    rows: string;
    columns: string;
    knitMode: string;
  };
  placeholders: {
    name: string;
  };
};

type ProjectDetailStrings = {
  notFoundTitle: string;
  notFoundDescription: string;
  detailsTitle: string;
  detailsHint: string;
  dangerTitle: string;
  dangerDescription: string;
  stats: {
    status: string;
    currentRow: string;
    totalRows: string;
    mode: string;
  };
  fields: {
    yarn: string;
    needleSize: string;
    notes: string;
  };
  placeholders: {
    projectName: string;
    yarn: string;
    needleSize: string;
    notes: string;
  };
};

type KnittingStrings = {
  missingTitle: string;
  missingDescription: string;
  modeLabels: {
    flat: string;
    round: string;
  };
  followHint: string;
  stats: {
    current: string;
    total: string;
  };
  buttons: {
    previous: string;
    next: string;
  };
};

type PatternEditorStrings = {
  missingTitle: string;
  missingDescription: string;
  editTitle: string;
  editHint: string;
  toolsTitle: string;
  paletteTitle: string;
  rows: string;
  columns: string;
  resizeTitle: string;
  gridTitle: string;
  toolLabels: {
    draw: string;
    erase: string;
  };
  selectColor: string;
  cellLabel: (row: number, column: number) => string;
};

type InsightsStrings = {
  progressLabel: string;
  title: string;
  subtitle: string;
  heroLabel: string;
  heroDescription: string;
  statLabels: {
    totalRows: string;
    inProgress: string;
  };
  weeklyTitle: string;
  weeklyHint: string;
  mostAdvancedTitle: string;
  mostAdvancedHint: string;
  noProjectData: string;
  rowsCompleted: (current: number, total: number) => string;
};

type SettingsStrings = {
  pageTitle: string;
  pageSubtitle: string;
  projectDefaultsTitle: string;
  displayTitle: string;
  languageTitle: string;
  languageDescription: string;
  languageLabel: string;
  appDataTitle: string;
  savedProjectsLabel: string;
  aboutTitle: string;
  aboutDescription: string;
  toggles: {
    showRowNumbers: {
      title: string;
      description: string;
    };
    highlightActiveRow: {
      title: string;
      description: string;
    };
  };
};

type Localization = {
  languageName: string;
  projects: ProjectsStrings;
  library: LibraryStrings;
  newProject: NewProjectStrings;
  projectDetail: ProjectDetailStrings;
  knitting: KnittingStrings;
  patternEditor: PatternEditorStrings;
  insights: InsightsStrings;
  settings: SettingsStrings;
  buttons: {
    back: string;
    createProject: string;
    cancel: string;
    openKnitMode: string;
    editPattern: string;
    watch: string;
    startProject: string;
    applySize: string;
    previousRow: string;
    nextRow: string;
    deleteProject: string;
    resetProjects: string;
  };
  statuses: Record<ProjectStatus, string>;
  confirmations: {
    deleteProject: (projectName: string) => string;
    resetProjects: string;
  };
  languageOptions: Record<Language, string>;
  labels: {
    projectNameInput: string;
    rowNumber: (row: number) => string;
    rowsCount: (count: number) => string;
  };
  dayLabels: string[];
  navigation: {
    projects: string;
    library: string;
    insights: string;
    settings: string;
    ariaLabel: string;
  };
};

const localizations: Record<Language, Localization> = {
  en: {
    languageName: "English",
    projects: {
      title: "Projects",
      subtitle:
        "Track rows, edit patterns, and keep your knitting projects in one place.",
      newProject: "New project",
      filters: {
        all: "All",
        inProgress: "In Progress",
        finished: "Finished",
      },
      empty: {
        title: "No projects yet",
        description:
          "Create your first knitting project to keep track of rows and notes.",
        action: "Start a project",
      },
    },
    library: {
      title: "Library",
      subtitle: "Keep stitches, techniques and visual ideas close while you work.",
      filters: {
        all: "All",
        stitches: "Stitches",
        techniques: "Techniques",
        patterns: "Patterns",
        saved: "Saved",
      },
      empty: {
        title: "No entries found",
        description: "Try another filter or add something new to your library.",
      },
    },
    newProject: {
      title: "Create project",
      subtitle:
        "Set up your rows, columns, and preferred knit mode before you begin.",
      hint: "A descriptive name helps keep your projects organized.",
      fields: {
        name: "Project name",
        rows: "Rows",
        columns: "Columns",
        knitMode: "Knit mode",
      },
      placeholders: {
        name: "e.g. Cozy pullover",
      },
    },
    projectDetail: {
      notFoundTitle: "Project not found",
      notFoundDescription: "This project does not exist or has been deleted.",
      detailsTitle: "Project details",
      detailsHint:
        "Keep all your project details and row progress in one place.",
      dangerTitle: "Danger zone",
      dangerDescription: "Delete this project if you no longer need it.",
      stats: {
        status: "Status",
        currentRow: "Current row",
        totalRows: "Total rows",
        mode: "Mode",
      },
      fields: {
        yarn: "Yarn",
        needleSize: "Needle size",
        notes: "Notes",
      },
      placeholders: {
        projectName: "Project name",
        yarn: "e.g. Merino Wool, 4 ply",
        needleSize: "e.g. 3.5 mm",
        notes: "Write any project notes here",
      },
    },
    knitting: {
      missingTitle: "Project not found",
      missingDescription: "We could not load this knitting project at the moment.",
      modeLabels: {
        flat: "Flat mode",
        round: "Round mode",
      },
      followHint:
        "Follow your pattern row by row. The active row is highlighted below.",
      stats: {
        current: "Current",
        total: "Total",
      },
      buttons: {
        previous: "Previous",
        next: "Next row",
      },
    },
    patternEditor: {
      missingTitle: "Project not found",
      missingDescription: "We could not load the pattern editor for this project.",
      editTitle: "Edit pattern",
      editHint: "Build your pattern by painting cells. Keep it simple and graphic.",
      toolsTitle: "Tools",
      paletteTitle: "Palette",
      rows: "Rows",
      columns: "Columns",
      resizeTitle: "Resize grid",
      gridTitle: "Pattern grid",
      toolLabels: {
        draw: "Draw",
        erase: "Erase",
      },
      selectColor: "Select color",
      cellLabel: (row, column) => `Cell ${row}-${column}`,
    },
    insights: {
      progressLabel: "PROGRESS",
      title: "Insights",
      subtitle: "A calm view of your knitting progress and current rhythm.",
      heroLabel: "Today",
      heroDescription:
        "Rows completed today across all your active knitting projects.",
      statLabels: {
        totalRows: "Total rows",
        inProgress: "In progress",
      },
      weeklyTitle: "Weekly activity",
      weeklyHint: "A simple look at your current knitting rhythm.",
      mostAdvancedTitle: "Most advanced project",
      mostAdvancedHint: "The project currently furthest along in your collection.",
      noProjectData: "No project data available yet.",
      rowsCompleted: (current, total) =>
        `${current} of ${total} rows completed.`,
    },
    settings: {
      pageTitle: "Settings",
      pageSubtitle:
        "Adjust how the app behaves and set your preferred defaults for new projects.",
      projectDefaultsTitle: "New project defaults",
      displayTitle: "Display",
      languageTitle: "Language",
      languageDescription: "Pick the language you want the app to speak.",
      languageLabel: "UI language",
      appDataTitle: "App data",
      savedProjectsLabel: "Saved projects",
      aboutTitle: "About",
      aboutDescription:
        "Knit Grid is a personal knitting tracker for patterns, rows and project notes. This version is designed as a lightweight web app MVP.",
      toggles: {
        showRowNumbers: {
          title: "Show row numbers",
          description: "Display row numbers next to the pattern grid.",
        },
        highlightActiveRow: {
          title: "Highlight active row",
          description: "Emphasize the current working row in knitting mode.",
        },
      },
    },
    buttons: {
      back: "Back",
      createProject: "Create project",
      cancel: "Cancel",
      openKnitMode: "Open knitting mode",
      editPattern: "Edit pattern",
      watch: "Watch",
      startProject: "Start a project",
      applySize: "Apply size",
      previousRow: "Previous",
      nextRow: "Next row",
      deleteProject: "Delete project",
      resetProjects: "Reset project data",
    },
    statuses: {
      "not-started": "Not started",
      "in-progress": "In progress",
      finished: "Finished",
    },
    confirmations: {
      deleteProject: (name: string) =>
        `Delete "${name}"? This cannot be undone.`,
      resetProjects:
        "Reset all projects back to the sample data? This will remove your current saved changes.",
    },
    languageOptions: {
      en: "English",
      da: "Dansk",
    },
    labels: {
      projectNameInput: "Project name",
      rowNumber: (row: number) => `Row ${row}`,
      rowsCount: (count: number) => `${count} rows`,
    },
    dayLabels: ["M", "T", "W", "T", "F", "S", "S"],
    navigation: {
      projects: "Projects",
      library: "Library",
      insights: "Insights",
      settings: "Settings",
      ariaLabel: "Primary navigation",
    },
  },
  da: {
    languageName: "Dansk",
    projects: {
      title: "Projekter",
      subtitle:
        "Hold styr på rækker, rediger mønstre og hav dine strikkeprojekter samlet ét sted.",
      newProject: "Nyt projekt",
      filters: {
        all: "Alle",
        inProgress: "I gang",
        finished: "Færdige",
      },
      empty: {
        title: "Ingen projekter endnu",
        description:
          "Opret dit første strikkeprojekt for at holde styr på rækker og noter.",
        action: "Start et projekt",
      },
    },
    library: {
      title: "Bibliotek",
      subtitle:
        "Hold masker, teknikker og visuelle idéer tæt på mens du arbejder.",
      filters: {
        all: "Alle",
        stitches: "Masker",
        techniques: "Teknikker",
        patterns: "Mønstre",
        saved: "Gemte",
      },
      empty: {
        title: "Ingen indlæg fundet",
        description: "Prøv et andet filter eller tilføj noget nyt til biblioteket.",
      },
    },
    newProject: {
      title: "Opret projekt",
      subtitle:
        "Angiv antal rækker, kolonner og foretrukken strikkemode før du går i gang.",
      hint: "Et beskrivende navn hjælper dig med at holde projekterne organiseret.",
      fields: {
        name: "Projektnavn",
        rows: "Rækker",
        columns: "Kolonner",
        knitMode: "Strikkemode",
      },
      placeholders: {
        name: "f.eks. Blød sweater",
      },
    },
    projectDetail: {
      notFoundTitle: "Projekt ikke fundet",
      notFoundDescription: "Dette projekt findes ikke eller er slettet.",
      detailsTitle: "Projektoplysninger",
      detailsHint:
        "Hold styr på projektets detaljer og rykkeprogression på ét sted.",
      dangerTitle: "Farlig zone",
      dangerDescription: "Slet projektet hvis du ikke længere har brug for det.",
      stats: {
        status: "Status",
        currentRow: "Aktuel række",
        totalRows: "Totale rækker",
        mode: "Mode",
      },
      fields: {
        yarn: "Garn",
        needleSize: "Strikkepindestørrelse",
        notes: "Noter",
      },
      placeholders: {
        projectName: "Projektnavn",
        yarn: "f.eks. Merino Wool, 4 ply",
        needleSize: "f.eks. 3,5 mm",
        notes: "Skriv dine projektnoter her",
      },
    },
    knitting: {
      missingTitle: "Projekt ikke fundet",
      missingDescription: "Vi kunne ikke indlæse dette strikkeprojekt lige nu.",
      modeLabels: {
        flat: "Flad mode",
        round: "Rund mode",
      },
      followHint:
        "Følg mønstret række for række. Den aktive række er markeret nedenfor.",
      stats: {
        current: "Aktuel",
        total: "Total",
      },
      buttons: {
        previous: "Forrige",
        next: "Næste række",
      },
    },
    patternEditor: {
      missingTitle: "Projekt ikke fundet",
      missingDescription: "Vi kunne ikke indlæse mønstereditoren for dette projekt.",
      editTitle: "Rediger mønster",
      editHint: "Samle mønstret ved at farve celler. Hold det enkelt og grafisk.",
      toolsTitle: "Værktøj",
      paletteTitle: "Palette",
      rows: "Rækker",
      columns: "Kolonner",
      resizeTitle: "Ændr størrelse",
      gridTitle: "Mønstergitter",
      toolLabels: {
        draw: "Tegn",
        erase: "Slet",
      },
      selectColor: "Vælg farve",
      cellLabel: (row, column) => `Celle ${row}-${column}`,
    },
    insights: {
      progressLabel: "FREMSKRIDT",
      title: "Indsigt",
      subtitle: "Et roligt overblik over din strikkeprogression og rytme.",
      heroLabel: "I dag",
      heroDescription:
        "Rækker færdiggjort i dag på tværs af dine aktive strikkeprojekter.",
      statLabels: {
        totalRows: "Totale rækker",
        inProgress: "I gang",
      },
      weeklyTitle: "Ugentlig aktivitet",
      weeklyHint: "Et simpelt kig på din nuværende strikkerytme.",
      mostAdvancedTitle: "Fremmeste projekt",
      mostAdvancedHint: "Det projekt der er længst fremme i din samling.",
      noProjectData: "Der findes endnu ingen projektdata.",
      rowsCompleted: (current, total) =>
        `${current} af ${total} rækker er klaret.`,
    },
    settings: {
      pageTitle: "Indstillinger",
      pageSubtitle:
        "Tilpas hvordan appen opfører sig og vælg standarder for nye projekter.",
      projectDefaultsTitle: "Standarder for nye projekter",
      displayTitle: "Visning",
      languageTitle: "Sprog",
      languageDescription: "Vælg det sprog, du ønsker appen skal bruge.",
      languageLabel: "Brugerfladesprog",
      appDataTitle: "App-data",
      savedProjectsLabel: "Gemte projekter",
      aboutTitle: "Om",
      aboutDescription:
        "Knit Grid er en personlig strikketracker til mønstre, rækker og projektnoter. Denne version er designet som en letvægts-MVP til nettet.",
      toggles: {
        showRowNumbers: {
          title: "Vis rækkenumre",
          description: "Vis rækkenumre ved siden af mønstergitteret.",
        },
        highlightActiveRow: {
          title: "Fremhæv aktiv række",
          description: "Få den aktive række til at skille sig ud i strikketilstand.",
        },
      },
    },
    buttons: {
      back: "Tilbage",
      createProject: "Opret projekt",
      cancel: "Annuller",
      openKnitMode: "Åbn strikketilstand",
      editPattern: "Rediger mønster",
      watch: "Se",
      startProject: "Start et projekt",
      applySize: "Anvend størrelse",
      previousRow: "Forrige",
      nextRow: "Næste række",
      deleteProject: "Slet projekt",
      resetProjects: "Nulstil projektdata",
    },
    statuses: {
      "not-started": "Ikke startet",
      "in-progress": "I gang",
      finished: "Færdig",
    },
    confirmations: {
      deleteProject: (name: string) =>
        `Slet "${name}"? Det kan ikke fortrydes.`,
      resetProjects:
        "Nulstil alle projekter til standarddata? Dette fjerner dine aktuelle ændringer.",
    },
    languageOptions: {
      en: "English",
      da: "Dansk",
    },
    labels: {
      projectNameInput: "Projektnavn",
      rowNumber: (row: number) => `Række ${row}`,
      rowsCount: (count: number) => `${count} rækker`,
    },
    dayLabels: ["M", "T", "O", "T", "F", "L", "S"],
    navigation: {
      projects: "Projekter",
      library: "Bibliotek",
      insights: "Indsigt",
      settings: "Indstillinger",
      ariaLabel: "Primær navigation",
    },
  },
};

export function getLocalization(lang: Language = "da"): Localization {
  return localizations[lang] ?? localizations.da;
}

export function useLocalization() {
  const language = useAppStore((state) => state.settings.language);
  return getLocalization(language ?? "da");
}
