"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navColumns } from "@/lib/nav-config";
import styles from "./Navbar.module.css";

export type ActiveMenuId = "about" | "programs" | "membership" | "community" | null;

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenuId>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsInteractionEnabled(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!navRef.current?.contains(target) && !mobileSidebarRef.current?.contains(target)) {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (menu: ActiveMenuId) => {
    if (!isInteractionEnabled) return;
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setActiveMenu(null);
  };

  const isProgramPage = pathname.startsWith("/programs/");
  const isAboutPage = pathname.startsWith("/about/");
  const isMembershipPage = pathname.startsWith("/membership/");
  const isCommunityPage = pathname.startsWith("/community/");

  const solidBg = isScrolled || activeMenu !== null || isMobileMenuOpen;

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      <div ref={navRef} className={styles.navWrapper}>
        <div
          className={`${styles.navShell} ${solidBg ? styles.navShellSolid : ""} ${activeMenu !== null && !isMobileMenuOpen ? styles.navShellExpanded : ""}`}
        >
          <div className={styles.mainContainer}>
            <div className={styles.left}>
              <Link href="/" className={styles.logoLink} aria-label="BFriends Home" onClick={closeMenu}>
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

            <nav className={styles.menuGrid}>
              <div className={styles.navItemWrapper}>
                <Link
                  href="/"
                  className={`${styles.menuTop} ${pathname === "/" ? styles.menuTopSelected : ""}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </div>

              {navColumns.map((col) => (
                <div
                  key={col.id}
                  className={`${styles.navItemWrapper} ${activeMenu === col.id ? styles.active : ""}`}
                >
                  <button
                    type="button"
                    className={`${styles.menuTop} ${col.id === "about" && isAboutPage ? styles.menuTopSelected : ""} ${col.id === "programs" && isProgramPage ? styles.menuTopSelected : ""} ${col.id === "membership" && isMembershipPage ? styles.menuTopSelected : ""} ${col.id === "community" && isCommunityPage ? styles.menuTopSelected : ""}`}
                    onClick={() => toggleMenu(col.id)}
                  >
                    {col.title}
                  </button>
                  <div className={styles.submenuDropdown}>
                    {col.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.menuItem}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className={styles.right}>
              <Button href="/contact" variant="border" className={styles.contactButton}>
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

            <button
              type="button"
              className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ""}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.mobileMenuIconWrapper}>
                <Menu size={24} className={styles.mobileMenuIcon} aria-hidden />
                <X size={24} className={styles.mobileMenuIconClose} aria-hidden />
              </span>
            </button>
          </div>

          {activeMenu !== null && !isMobileMenuOpen && <div className={styles.submenuDivider} />}
        </div>
      </div>

      <div
        ref={mobileSidebarRef}
        className={`${styles.mobileSidebar} ${isMobileMenuOpen ? styles.mobileSidebarOpen : ""}`}
      >
        <div className={styles.mobileSidebarContent}>
          <nav className={styles.mobileMenuGrid}>
            <div className={styles.mobileNavItemWrapper}>
              <Link href="/" className={styles.menuTop} onClick={closeMenu}>
                Home
              </Link>
            </div>
            {navColumns.map((col) => (
              <div
                key={col.id}
                className={`${styles.mobileNavItemWrapper} ${activeMenu === col.id ? styles.active : ""}`}
              >
                <button
                  type="button"
                  className={styles.menuTop}
                  onClick={() => toggleMenu(activeMenu === col.id ? null : col.id)}
                >
                  {col.title}
                </button>
                <div className={styles.mobileSubmenuDropdown}>
                  {col.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.menuItem}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className={styles.mobileMenuButtons}>
            <Button
              href="/contact"
              variant="border"
              className={styles.mobileContactButton}
              onClick={closeMenu}
            >
              Contact Us
            </Button>
            <Button
              href="/book"
              variant="primary"
              className={styles.mobileBookButton}
              fillColor="var(--color-cream-100)"
              icon={<ArrowUpRight size={16} />}
              onClick={closeMenu}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
