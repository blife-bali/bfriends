'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from "@/components/ui/Button/Button";
import { Plus, ChevronDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intro animation
    const tl = gsap.timeline();
    tl.fromTo(
      [leftRef.current, rightRef.current, centerRef.current],
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 3, 
        ease: 'power3.out',
        stagger: 1
      }
    );
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.default}`}>
      {/* Left Container */}
      <div className={styles.leftContainer} ref={leftRef}>
        <Button href="/" variant="text" className={styles.navLink}>
          Home
        </Button>
        <Button href="/about" variant="text" className={styles.navLink}>
          About us
        </Button>
        <Button 
          href="/program"
          variant="text" 
          className={`${styles.navLink} ${styles.programLink}`}
          icon={<Plus className={styles.plusIcon} />}
        >
          Program & Facilities
        </Button>
        <Button href="/stories" variant="text" className={styles.navLink}>
          Stories
        </Button>
      </div>

      {/* Center Container */}
      <div className={styles.centerContainer} ref={centerRef}>
        {/* Vertical Logo (Visible when transparent/top) */}
        <Link href="/" className={`${styles.logoLink} ${styles.verticalLink}`}>
          <Image
            src="/images/icons/logo-bfriends ver.png"
            alt="BFriends Logo Vertical"
            width={160} /* Adjust width based on aspect ratio */
            height={120}
            className={styles.logoVertical}
            priority
          />
        </Link>

        {/* Horizontal Logo (Visible when scrolled/solid) */}
        <Link href="/" className={`${styles.logoLink} ${styles.horizontalLink}`}>
          <Image
            src="/images/icons/logo-bfriends hor.png"
            alt="BFriends Logo Horizontal"
            width={200}
            height={40}
            className={styles.logoHorizontal}
            priority
          />
        </Link>
      </div>

      {/* Right Container */}
      <div className={styles.rightContainer} ref={rightRef}>
        <Button href="/membership" variant="text" className={styles.navLink}>
          Membership
        </Button>
        
        {/* Language Selector */}
        <Button 
          variant="underline" 
          icon={<ChevronDown size={14} />}
        >
          EN/ID
        </Button>

        {/* Book Now Button */}
        <Button 
          href="/book" 
          variant="primary" 
          icon={<ArrowUpRight className={styles.arrowIcon} />}
        >
          Book Now
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
