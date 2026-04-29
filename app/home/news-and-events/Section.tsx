"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    breakpoints: { "(min-width: 768px)": { loop: false } },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScroll = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScroll();
    emblaApi.on("scroll", updateScroll);
    emblaApi.on("reInit", updateScroll);
    return () => {
      emblaApi.off("scroll", updateScroll);
      emblaApi.off("reInit", updateScroll);
    };
  }, [emblaApi, updateScroll]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>News & Events</p>
          <h2 className={styles.heading}>
            News & Events <em>Across BLife Ecosystem</em>
          </h2>
        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {items.map((item) => (
                <div
                  key={`${item.type}-${item.data.id}`}
                  className={styles.emblaSlide}
                >
                  {item.type === "event" ? (
                    <EventCard item={item.data} />
                  ) : (
                    <NewsCard item={item.data} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerRow}>
          <div className={styles.arrowContainer}>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
              aria-label="Previous"
              onClick={() => {
                trackEvent('carousel_nav', { carousel: 'news_events', direction: 'prev' });
                emblaApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
              aria-label="Next"
              onClick={() => {
                trackEvent('carousel_nav', { carousel: 'news_events', direction: 'next' });
                emblaApi?.scrollNext();
              }}
              disabled={!canScrollNext}
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
          <div className={styles.buttonContainer}>
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
              href="/community/blife-ecosystem-news"
              onClick={() => trackEvent('cta_click', { label: 'more_news', location: 'home_news_events' })}
            >
              More news
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
