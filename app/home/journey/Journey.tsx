"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./Journey.module.css";

export default function Journey() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentColumn}>
          <h2 className={styles.heading}>
            A wellness journey that begins with becoming a{" "}
            <em className={styles.highlight}>friend to yourself.</em>
          </h2>
          <p className={styles.description}>
            Reconnecting with yourself is essential for a healthier, balanced life. BFriends is your dependable companion on this transformative journey, providing support and guidance as you explore your inner self and foster a sense of peace.
          </p>
          <div className={styles.buttonGroup}>
            <Button
              href="#learn-more"
              variant="primary"
              fillColor="var(--color-blue-100)"
              icon={<ArrowUpRightIcon size={16} />}
            >
              Learn More
            </Button>
            <Button
              href="#reserve"
              variant="primary"
              fillColor="var(--color-blue-100)"
              icon={<ArrowUpRightIcon size={16} />}
            >
              Reserve Schedule
            </Button>
          </div>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {!imageError ? (
              <Image
                src="/images/journey/section.webp"
                alt="BFriends venue with climbing wall and outdoor space"
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImageError(true)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
