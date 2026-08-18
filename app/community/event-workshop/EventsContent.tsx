"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/event-data";
import EventCard from "@/components/EventCard/EventCard";
import styles from "./EventsJournal.module.css";

const PAGE_SIZE = 16;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
] as const;

type JournalEvent = EventItem & { sort_order?: number };

function sortEvents(items: JournalEvent[], order: "newest" | "oldest"): JournalEvent[] {
  const copy = [...items];
  if (order === "newest") {
    copy.sort((a, b) => (b.sort_order ?? b.index ?? 0) - (a.sort_order ?? a.index ?? 0));
  } else {
    copy.sort((a, b) => (a.sort_order ?? a.index ?? 0) - (b.sort_order ?? a.index ?? 0));
  }
  return copy;
}

export default function EventsContent({ initialEvents = [] }: { initialEvents?: JournalEvent[] }) {
  const [search, setSearch] = useState("");
  const [ecosystem, setEcosystem] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const filterKey = `${search}|${ecosystem}|${sort}`;
  const [appliedFilterKey, setAppliedFilterKey] = useState(filterKey);
  if (appliedFilterKey !== filterKey) {
    setAppliedFilterKey(filterKey);
    setPage(1);
  }

  const ecosystems = useMemo(() => {
    const set = new Set(initialEvents.map((e) => e.ecosystem));
    return Array.from(set).sort();
  }, [initialEvents]);

  const filtered = useMemo(() => {
    let list = initialEvents;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) || e.text.toLowerCase().includes(q)
      );
    }
    if (ecosystem !== "all") {
      list = list.filter((e) => e.ecosystem === ecosystem);
    }
    return sortEvents(list, sort);
  }, [search, ecosystem, sort, initialEvents]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pagedItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const showPagination = filtered.length > PAGE_SIZE;

  return (
    <section className={styles.section}>
      {/* <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Events & Workshops</p>
      </div> */}
      <div className={styles.filters}>
        <div className={styles.filtersContainer}>
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events"
            />
          </div>
          <div className={styles.filterGroup}>
            <svg
              className={styles.filterIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <select
              className={styles.filterSelect}
              value={ecosystem}
              onChange={(e) => setEcosystem(e.target.value)}
              aria-label="Filter by ecosystem"
            >
              <option value="all">All</option>
              {ecosystems.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.sortGroup}>
            <svg
              className={styles.sortIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="m3 8 4-4 4 4M7 4v16M17 4v16M21 8l-4-4-4 4M17 4H7" />
            </svg>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
              aria-label="Sort order"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>No events match your filters.</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {pagedItems.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
          {showPagination ? (
            <nav className={styles.pagination} aria-label="Events pagination">
              <button
                type="button"
                className={styles.paginationBtn}
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className={styles.paginationStatus}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className={styles.paginationBtn}
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </nav>
          ) : null}
        </>
      )}
    </section>
  );
}
