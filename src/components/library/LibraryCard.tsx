import type { LibraryItem } from "../../types/library";
import "./LibraryCard.css";

type LibraryCardProps = {
  item: LibraryItem;
};

const categoryLabelMap: Record<LibraryItem["category"], string> = {
  stitches: "Stitches",
  techniques: "Techniques",
  patterns: "Patterns",
  saved: "Saved",
};

export function LibraryCard({ item }: LibraryCardProps) {
  return (
    <article className="library-card">
      <div className="library-card__top">
        <span className="library-card__category">
          {categoryLabelMap[item.category]}
        </span>
        {item.videoUrl ? (
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="library-card__video-link"
          >
            Watch
          </a>
        ) : null}
      </div>

      <div className="library-card__content">
        <h2 className="library-card__title">{item.title}</h2>
        <p className="library-card__subtitle">{item.subtitle}</p>
        <p className="library-card__description">{item.description}</p>
      </div>
    </article>
  );
}