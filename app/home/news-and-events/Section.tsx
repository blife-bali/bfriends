"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Section.module.css";
import EventCard from "@/components/EventCard/EventCard";
import NewsCard from "@/components/NewsCard/NewsCard";
import Button from "@/components/ui/Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/gtag";

type CarouselItem =
  | { type: "event"; data: any }
  | { type: "news"; data: any };

function interleaveEventsAndNews(events: any[], news: any[]): CarouselItem[] {
  const out: CarouselItem[] = [];
  const max = Math.max(events.length, news.length);
  for (let i = 0; i < max; i++) {
    if (events[i]) out.push({ type: "event", data: events[i] });
    if (news[i]) out.push({ type: "news", data: news[i] });
  }
  return out;
}

export default function Section({ events = [], news = [] }: { events?: any[]; news?: any[] }) {
  const items = useMemo(
    () => interleaveEventsAndNews(events, news),
    [events, news]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const scrollPrev = useCallback(() => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth / 2;
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, []);

  const scrollNext = useCallback(() => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth / 2;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            {/* <p className={styles.eyebrow}>News & Events</p> */}
            <h2 className={styles.heading}>
              BFriends <em>Journals <br/> & Events</em>
            </h2>
          </div>
          <div className={styles.navContainer}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => {
                trackEvent('carousel_nav', { carousel: 'news_events', direction: 'prev' });
                scrollPrev();
              }}
              disabled={!canScrollPrev}
              aria-label="Previous"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => {
                trackEvent('carousel_nav', { carousel: 'news_events', direction: 'next' });
                scrollNext();
              }}
              disabled={!canScrollNext}
              aria-label="Next"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.gridContainer} ref={containerRef}>
            {items.slice(0, 6).map((item, index) => (
              <div 
                key={`${item.type}-${item.data.id}-${index}`} 
                className={[
                  styles.gridItem,
                  index >= 4 ? styles.hideOnTab : "",
                  index >= 3 ? styles.hideOnMobile : ""
                ].filter(Boolean).join(" ")}
              >
                {item.type === "event" ? (
                  <EventCard item={item.data} landscape hideDescription />
                ) : (
                  <NewsCard item={item.data} landscape hideDescription />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <div className={styles.buttonContainer}>
          <Button
            color="var(--color-green-100)"
            showIcon
            href="/community/event-workshop"
            onClick={() => trackEvent('cta_click', { label: 'more_events', location: 'home_news_events' })}
          >
            More events
          </Button>
          <Button
            color="var(--color-green-100)"
            showIcon
            href="/community/journal"
            onClick={() => trackEvent('cta_click', { label: 'more_news', location: 'home_news_events' })}
          >
            BFriends Journal
          </Button>
        </div> */}
      </div>
    </section>
  );
}
