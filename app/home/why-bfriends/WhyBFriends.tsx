"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./WhyBFriends.module.css";
import { whyBFriendsData } from "@/lib/whybfriends-data";

export default function WhyBFriends() {
  const [selectedId, setSelectedId] = useState(1);
  const [prevId, setPrevId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const selectedData = whyBFriendsData.find((item) => item.id === selectedId) || whyBFriendsData[0];
  const prevData = whyBFriendsData.find((item) => item.id === prevId) || whyBFriendsData[0];

  useEffect(() => {
    if (selectedId !== prevId) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setPrevId(selectedId);
        setIsTransitioning(false);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [selectedId, prevId]);

  const formatId = (id: number): string => {
    return `${id.toString().padStart(2, "0")}.`;
  };

  return (
    <section className={styles.section}>
      {/* Image Container Section */}
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {/* Previous Image - fading out */}
          {prevId !== selectedId && (
            <Image
              src={prevData.image}
              alt={prevData.point}
              fill
              className={`${styles.image} ${styles.imageFadeOut}`}
              sizes="100vw"
            />
          )}
          {/* Current Image - fading in */}
          <Image
            src={selectedData.image}
            alt={selectedData.point}
            fill
            className={`${styles.image} ${prevId !== selectedId ? styles.imageFadeIn : styles.imageVisible}`}
            priority={selectedId === 1}
            sizes="100vw"
          />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.contentOverlay}>
          <div className={styles.mainHeading}>
            <span className={styles.headingText}>Why <em> BFirends </em> Exists? </span>
          </div>
          <div className={styles.subHeading}>
            <div className={styles.pointDetails} key={selectedId}>
              <span className={styles.pointText}>{selectedData.point}<br /></span>
              <span className={styles.subpoint}>{selectedData.subpoint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Points Selection Section */}
      <div className={styles.pointsSection}>
        <div className={styles.pointsContainer}>
          <div className={styles.pointsGrid}>
            {whyBFriendsData.map((item) => (
              <button
                key={item.id}
                className={`${styles.pointItem} ${selectedId === item.id ? styles.pointItemSelected : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                {selectedId === item.id && (
                  <span className={styles.pointNumber}>{formatId(item.id)}</span>
                )}
                <div className={styles.pointTitle}>{item.point}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
