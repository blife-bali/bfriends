"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { ArrowUpRight } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About BFriends" },
  { href: "/program", label: "Program" },
  { href: "/membership", label: "Membership" },
  { href: "/stories", label: "Community" },
  
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Update scrolled state for styling
      setIsScrolled(currentScrollY > scrollThreshold);

      // Always show navbar at the top
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      } else {
        // Only update visibility if scroll difference is significant (prevents flickering)
        if (scrollDifference > 5) {
          // Hide when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.default} ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.mainContainer}>
      {/* Left: icon */}
      <div className={styles.left}>
        <Link href="/" className={styles.logoLink} aria-label="BFriends Home">
          <Image
            src="/images/icons/logo-default.svg"
            alt="BFriends"
            width={120}
            height={40}
            className={styles.logo}
            priority
          />
        </Link>
      </div>

      {/* Middle: menus */}
      <div className={styles.menuContainer}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className={styles.menuLink}>
            {label}
          </Link>
        ))}
      </div>

      {/* Right: Contact Us (border, no arrow) + Book Now (primary cream with arrow) */}
      <div className={styles.right}>
        <Button
          href="/contact"
          variant="border"
          className={styles.contactButton}
        >
          Contact Us
        </Button>
        <Button
          href="/book"
          variant="primary"
          className={styles.bookButton}
          fillColor="var(--color-cream-100)"
          icon={<ArrowUpRight size={16} />}
        >
          Book Now
        </Button>
       </div>  
      </div>
    </nav>
  );
}
