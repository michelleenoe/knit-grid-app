import { useAppStore } from "../../app/store";
import { useLocalization } from "../../localization/Localization";
import type { LibraryItem } from "../../types/library";
import "./LibraryCard.css";

type LibraryCardProps = {
  item: LibraryItem;
};

export function LibraryCard({ item }: LibraryCardProps) {
  const localization = useLocalization();
  const language = useAppStore((state) => state.settings.language);

  return (
    <article className="library-card">
      <div className="library-card__top">
        <span className="library-card__category">
          {localization.library.filters[item.category]}
        </span>
        {item.videoUrl ? (
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="library-card__video-link"
          >
            {localization.buttons.watch}
          </a>
        ) : null}
      </div>

      <div className="library-card__content">
        <h2 className="library-card__title">{item.title[language]}</h2>
        <p className="library-card__subtitle">{item.subtitle[language]}</p>
        <p className="library-card__description">{item.description[language]}</p>
      </div>
    </article>
  );
}
