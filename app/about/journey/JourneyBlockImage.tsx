"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";

interface JourneyBlockImageProps {
  src: string;
  alt: string;
}

export default function JourneyBlockImage({ src, alt }: JourneyBlockImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY !== lastScrollY.current) {
        scrollDirection.current = currentY > lastScrollY.current ? "down" : "up";
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else if (scrollDirection.current === "up") {
          setIsInView(false);
        }
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={parallax.imageWrap} ref={wrapperRef}>
      <div
        className={`${parallax.imageFrame} ${parallax.imageFrameRatioIntro} ${isInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
      >
        <motion.div className={parallax.parallaxLayer} style={{ y }}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`${parallax.coverImage} ${parallax.coverImageSharp}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1660px"
            quality={100}
            unoptimized
          />
        </motion.div>
      </div>
    </div>
  );
}
