import { useMemo, useState } from "react";
import { PageShell } from "../components/common/PageShell";
import { SectionTitle } from "../components/common/SectionTitle";
import { EmptyState } from "../components/common/EmptyState";
import { LibraryCard } from "../components/library/LibraryCard";
import { libraryItems } from "../data/library";
import type { LibraryCategory } from "../types/library";

type LibraryFilter = "all" | LibraryCategory;

const filterOptions: { key: LibraryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "stitches", label: "Stitches" },
  { key: "techniques", label: "Techniques" },
  { key: "patterns", label: "Patterns" },
  { key: "saved", label: "Saved" },
];

export function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<LibraryFilter>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return libraryItems;
    return libraryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <PageShell>
      <SectionTitle
        title="Library"
        subtitle="Keep stitches, techniques and visual ideas close while you work."
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
          title="No entries found"
          description="Try another filter or add something new to your library."
        />
      )}
    </PageShell>
  );
}
