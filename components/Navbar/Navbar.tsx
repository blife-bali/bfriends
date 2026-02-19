"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About BFriends" },
  { href: "/program", label: "Program" },
  { href: "/membership", label: "Membership" },
  { href: "/stories", label: "Community" },
  
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10;

      // Update scrolled state for styling (keeps hero and scrolled states)
      setIsScrolled(currentScrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Force scrolled mode when mobile menu is open
  const shouldUseScrolledMode = isScrolled || isMobileMenuOpen;

  return (
    <>
      <nav
        className={`${styles.navbar} ${shouldUseScrolledMode ? styles.scrolled : styles.default}`}
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
          {NAV_LINKS.map(({ href, label }) => {
            const isSelected = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.menuLink} ${isSelected ? styles.menuLinkSelected : ""}`}
              >
                {label}
              </Link>
            );
          })}
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

         {/* Mobile: Menu Icon */}
         <button 
           className={styles.mobileMenuButton} 
           aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
         >
           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu - Outside nav to avoid clipping */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDropdown}>
          <div className={styles.mobileMenuLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link 
                key={href} 
                href={href} 
                className={styles.mobileMenuLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className={styles.mobileMenuButtons}>
            <Button
              href="/contact"
              variant="border"
              className={styles.mobileContactButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACT US
            </Button>
            <Button
              href="/book"
              variant="primary"
              className={styles.mobileBookButton}
              fillColor="var(--color-cream-100)"
              icon={<ArrowUpRight size={16} />}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
