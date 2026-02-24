"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CustomerJourney.module.css";

interface JourneyBlockImageProps {
  src: string;
  alt: string;
}

export default function JourneyBlockImage({ src, alt }: JourneyBlockImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.blockImageWrapper} ref={wrapperRef}>
      <div
        className={`${styles.blockImageInner} ${isInView ? styles.blockImageInnerVisible : styles.blockImageInnerBefore}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.blockSectionImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
        />
      </div>
    </div>
  );
}
