"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/ui/Button/Button";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import { mockFacilities, mockFacilitiesPage } from "@/mock/facilities";
import styles from "./Section.module.css";

export default function FriendsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const facilities = [...mockFacilities].sort((a, b) => a.sort_order - b.sort_order);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: true,
  });

  const updateCarousel = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateCarousel();
    emblaApi.on("select", updateCarousel);
    emblaApi.on("reInit", updateCarousel);
    return () => {
      emblaApi.off("select", updateCarousel);
      emblaApi.off("reInit", updateCarousel);
    };
  }, [emblaApi, updateCarousel]);

  const activeFacility = facilities[selectedIndex];

  return (
    <section className={styles.section} aria-label="BFriends facilities">
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.carouselCol}>
            <div
              className={`${styles.imageFrame} ${parallax.imageFrame}`}
            >
              <div className={styles.embla} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                  {facilities.map((facility) => (
                    <div key={facility.id} className={styles.emblaSlide}>
                      <div className={styles.slideImage}>
                        <Image
                          src={facility.image}
                          alt={facility.name}
                          fill
                          className={parallax.coverImage}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.imageScrim} aria-hidden="true" />

              <div className={styles.imageChrome}>
                <p className={styles.slideTitle} aria-live="polite">
                  {activeFacility?.name}
                </p>

                <div className={styles.arrowGroup}>
                  <button
                    type="button"
                    className={styles.navButton}
                    aria-label="Previous facility"
                    onClick={() => emblaApi?.scrollPrev()}
                  >
                    <ChevronLeft size={22} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    aria-label="Next facility"
                    onClick={() => emblaApi?.scrollNext()}
                  >
                    <ChevronRight size={22} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.copyCol}>
            <div className={`${parallax.copyGrid} ${styles.copyGrid}`}>
              <div className={parallax.copyColLeft}>
                <h2 className={parallax.copyTitle}>{mockFacilitiesPage.intro_title}</h2>
              </div>
              <div className={`${parallax.copyColRight} ${parallax.copyColGapTight}`}>
                <p className={parallax.copyBody}>{mockFacilitiesPage.intro_body}</p>
                <Button href="/about/facilities" color="var(--color-blue-100)">
                  Explore Facilities
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
