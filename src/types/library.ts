export type LibraryCategory =
  | "stitches"
  | "techniques"
  | "patterns"
  | "saved";

export type LocalizedField = {
  en: string;
  da: string;
};

export type LibraryItem = {
  id: string;
  category: LibraryCategory;
  title: LocalizedField;
  subtitle: LocalizedField;
  description: LocalizedField;
  videoUrl?: string;
};
