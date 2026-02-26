"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard/EventCard";
import { eventData, type EventItem } from "@/lib/event-data";
import styles from "./EventsJournal.module.css";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
] as const;

function sortEvents(items: EventItem[], order: "newest" | "oldest"): EventItem[] {
  const copy = [...items];
  if (order === "newest") {
    copy.sort((a, b) => b.index - a.index);
  } else {
    copy.sort((a, b) => a.index - b.index);
  }
  return copy;
}

export default function EventsContent() {
  const [search, setSearch] = useState("");
  const [ecosystem, setEcosystem] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const ecosystems = useMemo(() => {
    const set = new Set(eventData.map((e) => e.ecosystem));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = eventData;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }
    if (ecosystem !== "all") {
      list = list.filter((e) => e.ecosystem === ecosystem);
    }
    return sortEvents(list, sort);
  }, [search, ecosystem, sort]);

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
        <div className={styles.grid}>
          {filtered.map((item) => (
            <EventCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
