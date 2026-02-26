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
              className={styles.bookNowButton}
              color="#134053"
              showIcon
            >
              Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
