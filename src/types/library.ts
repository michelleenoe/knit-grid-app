export type LibraryCategory =
  | "stitches"
  | "techniques"
  | "patterns"
  | "saved";

export type LibraryItem = {
  id: string;
  category: LibraryCategory;
  title: string;
  subtitle: string;
  description: string;
  videoUrl?: string;
};