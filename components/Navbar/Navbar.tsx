"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { ArrowUpRight } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/program", label: "Program & Facilities" },
  { href: "/stories", label: "Stories" },
  { href: "/membership", label: "Membership" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.default}`}
    >
      {/* Left: icon */}
      <div className={styles.left}>
        <Link href="/" className={styles.logoLink} aria-label="BFriends Home">
          <Image
            src="/images/icons/logo-bfriends hor.png"
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
    </nav>
  );
}
