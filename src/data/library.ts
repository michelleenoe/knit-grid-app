import type { LibraryItem } from "../types/library";

const withLocales = (strings: {
  title: { en: string; da: string };
  subtitle: { en: string; da: string };
  description: { en: string; da: string };
  videoUrl?: string;
}) => strings;

export const libraryItems: LibraryItem[] = [
  {
    id: "1",
    category: "stitches",
    ...withLocales({
      title: { en: "Knit Stitch", da: "Strikmaske" },
      subtitle: { en: "The foundation stitch", da: "Grundmasken" },
      description: {
        en: "The knit stitch is one of the two core stitches in knitting and forms the basis of many patterns.",
        da: "Strikmasken er en af de to centrale masker i strik og danner basen i mange mønstre.",
      },
      videoUrl: "https://www.youtube.com/watch?v=OPDbHdhKvng",
    }),
  },
  {
    id: "2",
    category: "stitches",
    ...withLocales({
      title: { en: "Purl Stitch", da: "Vridemaske" },
      subtitle: { en: "The reverse companion", da: "Den spejlede makker" },
      description: {
        en: "The purl stitch pairs with the knit stitch and is essential for ribbing, texture and structure.",
        da: "Vridemasken supplerer strikmasken og er vigtig for rib, tekstur og struktur.",
      },
      videoUrl: "https://www.youtube.com/watch?v=7ePhLqw6HDM",
    }),
  },
  {
    id: "3",
    category: "techniques",
    ...withLocales({
      title: { en: "M1L", da: "M1L" },
      subtitle: { en: "Left-leaning increase", da: "Venstre-tiltag" },
      description: {
        en: "Make one left creates a subtle left-leaning increase often used in raglan shaping.",
        da: "Make one left skaber en subtil venstredrejende øgning, ofte brugt i raglanformning.",
      },
      videoUrl: "https://www.youtube.com/watch?v=XygPZ2cWBeA",
    }),
  },
  {
    id: "4",
    category: "techniques",
    ...withLocales({
      title: { en: "M1R", da: "M1R" },
      subtitle: { en: "Right-leaning increase", da: "Højre-tiltag" },
      description: {
        en: "Make one right creates a mirrored increase that pairs well with M1L in shaping.",
        da: "Make one right er en spejlet øgning, der passer fint sammen med M1L i formning.",
      },
      videoUrl: "https://www.youtube.com/watch?v=7rRINxduDyo",
    }),
  },
  {
    id: "5",
    category: "patterns",
    ...withLocales({
      title: { en: "Color Blocking", da: "Farveblokke" },
      subtitle: { en: "Modern graphic inspiration", da: "Grafisk inspiration" },
      description: {
        en: "Use larger sections of contrasting colors to create a clean and bold visual rhythm in your knitting.",
        da: "Brug store felter af kontrastfarver for at skabe en ren og dristig rytme i dit strik.",
      },
    }),
  },
  {
    id: "6",
    category: "patterns",
    ...withLocales({
      title: { en: "Striped Repeat", da: "Stribet gentagelse" },
      subtitle: { en: "Simple and effective", da: "Simpelt og effektivt" },
      description: {
        en: "Alternating rows of color can create strong movement and a very readable structure.",
        da: "Skiftende farverækker skaber bevægelse og en let læselig struktur.",
      },
    }),
  },
  {
    id: "7",
    category: "saved",
    ...withLocales({
      title: { en: "Raglan Notes", da: "Raglan-noter" },
      subtitle: { en: "Personal reference", da: "Personlig reference" },
      description: {
        en: "A saved note about raglan increases, marker placement and row rhythm for future projects.",
        da: "En gemt note om raglanøgninger, markørplacering og rækkerytme til fremtidige projekter.",
      },
    }),
  },
];
