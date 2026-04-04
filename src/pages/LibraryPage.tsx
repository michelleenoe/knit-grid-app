import { useMemo, useState } from "react";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { EmptyState } from "../components/common/EmptyState";
import { LibraryCard } from "../components/library/LibraryCard";
import { libraryItems } from "../data/library";
import type { LibraryCategory } from "../types/library";
import { useLocalization } from "../localization/Localization";

type LibraryFilter = "all" | LibraryCategory;

export function LibraryPage() {
  const localization = useLocalization();
  const [activeFilter, setActiveFilter] = useState<LibraryFilter>("all");
  const filterOptions: { key: LibraryFilter; label: string }[] = [
    { key: "all", label: localization.library.filters.all },
    { key: "stitches", label: localization.library.filters.stitches },
    { key: "techniques", label: localization.library.filters.techniques },
    { key: "patterns", label: localization.library.filters.patterns },
    { key: "saved", label: localization.library.filters.saved },
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return libraryItems;
    return libraryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <PageShell>
      <SectionTitle
        title={localization.library.title}
        subtitle={localization.library.subtitle}
      />

      <div className="chip-group">
        {filterOptions.map((option) => {
          const isActive = option.key === activeFilter;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setActiveFilter(option.key)}
              className={`chip-group__item${
                isActive ? " chip-group__item--active" : ""
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {filteredItems.length ? (
        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {filteredItems.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={localization.library.empty.title}
          description={localization.library.empty.description}
        />
      )}
    </PageShell>
  );
}
