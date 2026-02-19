"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

export default function Intro() {
  const [isInView, setIsInView] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when 25% of the container is visible
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px",
      }
    );

    if (videoWrapperRef.current) {
      observer.observe(videoWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        {/* Text Content */}
        <div className={styles.textColumn}>
          <div className={styles.headingContainer}>
            <p className={styles.combinedParagraph}>
              <span className={styles.heading}>
                A journey to become your own friend.{" "}
              </span>
              
            </p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
            BFriends is a wellness hub in Kerobokan, Bali. A place created to reconnect with the oldest companion in your life, yourself. Here, wellness is not about pushing limits or chasing outcomes. It is about understanding, accepting, and caring for your body and mind through intentional movement, mindful rest, and restoration.
            </p>
            
          </div>
        </div>

        {/* Video Container */}
        <div className={styles.videoWrapper} ref={videoWrapperRef}>
          <video 
            className={`${styles.video} ${isInView ? styles.videoVisible : styles.videoBefore}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/hero/Venue-4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Conclusion Section */}
        <div className={styles.conclusionContainer}>
          <div className={styles.leftConclusion}>
            <h2 className={styles.conclusionTitle}>
              A journey to become your own friend.{" "}
            </h2>
          </div>
          <div className={styles.rightConclusion}>
            <p className={styles.conclusionText}>
              BFriends is a wellness hub in Kerobokan, Bali. A place created to reconnect with the oldest companion in your life, yourself. Here, wellness is not about pushing limits or chasing outcomes. It is about understanding, accepting, and caring for your body and mind through intentional movement, mindful rest, and restoration.
            </p>
            <Button
            href="/about"
            variant="underline"
            className={styles.button}
            color="var(--color-blue-100)"
            icon={<ArrowUpRight size={16} />}
          >
            About Us
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
