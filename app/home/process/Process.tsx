"use client";

import { useRef } from "react";
import styles from "./Process.module.css";
import { ArrowUpRightIcon } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Carousel from "./Carousel";

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section className={styles.processSection} ref={containerRef}>
      <div className={styles.container}>
        {/* Top Section: Eyebrow + Title */}
        <div className={styles.topSection}>
          <p className={styles.eyebrow}>Our Process</p>
          <h1 className={styles.heading}>
              Simple Steps to Start Your <br/><em>Journey</em> to <em>Befriend</em> Yourself
          </h1>
        </div>

        {/* Middle: Carousel */}
        <Carousel containerRef={containerRef} />

        {/* Bottom: Conclusion + Button */}
        <div className={styles.bottomSection}>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description2}>
              A proven methodology that transforms your wellness journey from uncertainty to confidence, guided by science and personalized every step of the way.
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              href="#contact"
              variant="border"
              className={styles.bookNowButton}
              color="#134053"
              icon={<ArrowUpRightIcon size={16} />}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
