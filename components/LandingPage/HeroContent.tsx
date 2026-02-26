"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button/Button";
import { ChevronDown } from "lucide-react";
import anime from "animejs";
import styles from "./HeroContent.module.css";

const SplitText = ({ text }: { text: string }) => {
  const parts = text.split(/(\s+)/);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(/^\s+$/)) {
          return <span key={index}>{part}</span>;
        }
        
        return (
          <span key={index} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {part.split('').map((char, charIndex) => (
              <span 
                key={charIndex} 
                className="anime-char" 
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
};

export default function HeroContent({ onButtonAnimationStart }: { onButtonAnimationStart?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !buttonRef.current || !underlineRef.current) return;

    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // Animate text characters
    // Scope strictly to this component to avoid animating other elements
    const chars = containerRef.current.querySelectorAll('.anime-char');

    tl.add({
      targets: chars,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(30),
      duration: 800,
      easing: 'easeOutQuad',
    })
    .add({
      targets: [buttonRef.current, underlineRef.current],
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 1200,
      easing: 'easeOutQuad',
      begin: () => {
        if (onButtonAnimationStart) {
          onButtonAnimationStart();
        }
      }
    }, '-=600');

  }, [onButtonAnimationStart]);

  return (
    <div className={styles.heroContainer} ref={containerRef}>
      <p className={styles.heroSubtitle}>
        <SplitText text="Welcome to BFriends" />
      </p>

      <h1 className={styles.heroTitle}>
        <SplitText text="A wellness " />
        <span className={styles.heroHighlight}>
          <SplitText text="journey" />
        </span>
        <SplitText text=" that " />
        <SplitText text="begins with becoming a " />
        <span className={styles.heroHighlightBorder}>
          <SplitText text="friend to yourself." />
          <div 
            ref={underlineRef}
            className={styles.heroHighlightUnderline} 
            style={{ opacity: 0 }}
          />
        </span>
      </h1>

      <Button
        ref={buttonRef}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" });
        }}
        className={styles.scrollButton}
        style={{ opacity: 0 }}
        showIcon={false}
      >
        Discover More <ChevronDown className="w-5 h-5" />
      </Button>
    </div>
  );
}
