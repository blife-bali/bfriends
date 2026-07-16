"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navColumns, utilityNavItems, helpNavItem, type NavColumnId, type NavItem } from "@/lib/nav-config";
import { BOOK_NOW_URL } from "@/lib/site-contact";
import { trackEvent } from "@/lib/gtag";
import Button from "@/components/ui/Button/Button";
import styles from "./Navbar.module.css";

export type ActiveMenuId = "about" | "programs" | "treatments" | "membership" | "community" | null;

const CURRENT_LANGUAGE = {
  name: "English",
  flagSrc: "/images/icons/flag-us.svg",
  flagAlt: "United States flag",
} as const;

interface ProgramApiItem {
  name: string;
  slug: string;
  image?: string | null;
  sort?: number;
}

/** Columns that navigate directly instead of opening a dropdown. */
const DIRECT_LINK_HREFS: Partial<Record<NavColumnId, string>> = {
  about: "/about",
};

function MenuGrid({
  pathname,
  activeMenu,
  isProgramPage,
  isTreatmentsPage,
  isAboutPage,
  isMembershipPage,
  isCommunityPage,
  isContactPage,
  onNavClick,
  onToggleMenu,
}: {
  pathname: string;
  activeMenu: ActiveMenuId;
  isProgramPage: boolean;
  isTreatmentsPage: boolean;
  isAboutPage: boolean;
  isMembershipPage: boolean;
  isCommunityPage: boolean;
  isContactPage: boolean;
  onNavClick: (label: string) => void;
  onToggleMenu: (menu: ActiveMenuId) => void;
}) {
  return (
    <nav className={styles.menuGrid}>
      <div className={styles.navItemWrapper}>
        <Link
          href="/"
          className={`${styles.menuTop} ${pathname === "/" ? styles.menuTopSelected : ""}`}
          onClick={() => onNavClick("Home")}
        >
          Home
        </Link>
      </div>

      {navColumns
        .filter((col) => col.id !== "membership" && col.id !== "community")
        .map((col) => {
          const directHref = DIRECT_LINK_HREFS[col.id];
          const isSelected =
            (col.id === "about" && isAboutPage) ||
            (col.id === "treatments" && isTreatmentsPage) ||
            (col.id === "programs" && isProgramPage) ||
            (col.id === "membership" && isMembershipPage) ||
            (col.id === "community" && isCommunityPage);

          return (
            <div
              key={col.id}
              className={`${styles.navItemWrapper} ${activeMenu === col.id ? styles.active : ""}`}
            >
              {directHref ? (
                <Link
                  href={directHref}
                  className={`${styles.menuTop} ${isSelected ? styles.menuTopSelected : ""}`}
                  onClick={() => onNavClick(col.title)}
                >
                  {col.title}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`${styles.menuTop} ${isSelected ? styles.menuTopSelected : ""}`}
                  onClick={() => {
                    onNavClick(col.title);
                    onToggleMenu(col.id);
                  }}
                >
                  {col.title}
                </button>
              )}
            </div>
          );
        })}

      {utilityNavItems.map((item) => {
        const isSelected = item.href === "/contact" && isContactPage;

        return (
          <div key={item.href} className={styles.navItemWrapper}>
            <Link
              href={item.href}
              className={`${styles.menuTop} ${isSelected ? styles.menuTopSelected : ""}`}
              onClick={() => onNavClick(item.label)}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

function MobileMenuList({
  pathname,
  activeMenu,
  isProgramPage,
  isTreatmentsPage,
  isAboutPage,
  isMembershipPage,
  isCommunityPage,
  isContactPage,
  programItems,
  treatmentItems,
  onNavClick,
  onToggleMenu,
  onItemClick,
}: {
  pathname: string;
  activeMenu: ActiveMenuId;
  isProgramPage: boolean;
  isTreatmentsPage: boolean;
  isAboutPage: boolean;
  isMembershipPage: boolean;
  isCommunityPage: boolean;
  isContactPage: boolean;
  programItems: NavItem[];
  treatmentItems: NavItem[];
  onNavClick: (label: string) => void;
  onToggleMenu: (menu: ActiveMenuId) => void;
  onItemClick: (label: string, menuId: NavColumnId) => void;
}) {
  const columns = navColumns.filter((col) => col.id !== "membership" && col.id !== "community");

  const getSubmenuItems = (colId: NavColumnId): NavItem[] => {
    if (colId === "programs") return programItems;
    if (colId === "treatments") return treatmentItems;
    return [...(navColumns.find((c) => c.id === colId)?.items || [])];
  };

  return (
    <nav className={styles.mobileMenuList}>
      <div className={styles.mobileNavItem}>
        <Link
          href="/"
          className={`${styles.menuTop} ${pathname === "/" ? styles.menuTopSelected : ""}`}
          onClick={() => onNavClick("Home")}
        >
          Home
        </Link>
      </div>

      {columns.map((col) => {
        const isSelected =
          (col.id === "about" && isAboutPage) ||
          (col.id === "programs" && isProgramPage) ||
          (col.id === "treatments" && isTreatmentsPage) ||
          (col.id === "membership" && isMembershipPage) ||
          (col.id === "community" && isCommunityPage);

        const directHref = DIRECT_LINK_HREFS[col.id];
        if (directHref) {
          return (
            <div key={col.id} className={styles.mobileNavItem}>
              <Link
                href={directHref}
                className={`${styles.menuTop} ${isSelected ? styles.menuTopSelected : ""}`}
                onClick={() => onNavClick(col.title)}
              >
                {col.title}
              </Link>
            </div>
          );
        }

        return (
          <div key={col.id} className={styles.mobileNavItem}>
            <button
              type="button"
              className={`${styles.menuTop} ${isSelected ? styles.menuTopSelected : ""} ${activeMenu === col.id ? styles.mobileNavItemActive : ""}`}
              onClick={() => {
                onNavClick(col.title);
                onToggleMenu(col.id);
              }}
              aria-expanded={activeMenu === col.id}
            >
              {col.title}
            </button>
            {activeMenu === col.id && (
              <ul className={styles.mobileSubmenuList}>
                {getSubmenuItems(col.id).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.menuItem}
                      onClick={() => onItemClick(item.label, col.id)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {utilityNavItems.map((item) => {
        const isSelected = item.href === "/contact" && isContactPage;

        return (
          <div key={item.href} className={styles.mobileNavItem}>
            <Link
              href={item.href}
              className={`${styles.menuTop} ${isSelected ? styles.menuTopSelected : ""}`}
              onClick={() => onNavClick(item.label)}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenuId>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);
  const [programItems, setProgramItems] = useState<NavItem[]>([]);
  const [treatmentItems, setTreatmentItems] = useState<NavItem[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsInteractionEnabled(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    async function loadPrograms() {
      try {
        const response = await fetch("/api/programs", { cache: "no-store" });
        if (!response.ok) return;
        const data: ProgramApiItem[] = await response.json();
        if (!isMounted) return;
        setProgramItems(
          data.map((program) => ({
            label: program.name,
            href: `/programs/${program.slug}`,
            image: program.image || undefined,
          })),
        );
      } catch {
        if (isMounted) setProgramItems([]);
      }
    }

    async function loadTreatments() {
      try {
        const response = await fetch("/api/treatments", { cache: "no-store" });
        if (!response.ok) return;
        const data: { id: string; label: string; href: string; sort_order: number }[] = await response.json();
        if (!isMounted) return;
        setTreatmentItems(
          data.map((item) => {
            const [primary, secondary] = item.label.split(" | ");
            return {
              label: item.label,
              labelPrimary: primary,
              labelSecondary: secondary,
              href: item.href,
            };
          }),
        );
      } catch {
        if (isMounted) setTreatmentItems([]);
      }
    }

    loadPrograms();
    loadTreatments();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!navRef.current?.contains(target)) {
        setActiveMenu(null);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mainEl = mainContainerRef.current;
    const rootEl = navRef.current;
    if (!mainEl || !rootEl) return;

    const syncNavbarMainHeight = () => {
      rootEl.style.setProperty("--navbar-main-height", `${mainEl.offsetHeight}px`);
    };

    syncNavbarMainHeight();
    const observer = new ResizeObserver(syncNavbarMainHeight);
    observer.observe(mainEl);
    window.addEventListener("resize", syncNavbarMainHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncNavbarMainHeight);
    };
  }, []);

  const toggleMenu = (menu: ActiveMenuId) => {
    if (!isInteractionEnabled) return;
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setIsMenuOpen(false);
  };

  const toggleMenuPanel = () => {
    setIsMenuOpen((open) => {
      if (open) setActiveMenu(null);
      return !open;
    });
  };

  const isProgramPage = pathname === "/programs" || pathname.startsWith("/programs/");
  const isTreatmentsPage = pathname.startsWith("/treatments");
  const isAboutPage = pathname === "/about" || pathname.startsWith("/about/");
  const isMembershipPage = pathname.startsWith("/membership/");
  const isCommunityPage = pathname.startsWith("/community/");
  const isContactPage = pathname.startsWith("/contact");

  const isEventSlug = pathname.startsWith("/community/event/");
  const isNewsSlug = pathname.startsWith("/community/news/");
  const isFaqPage = pathname === "/faq";

  const solidBg =
    isFaqPage ||
    isEventSlug ||
    isNewsSlug ||
    isScrolled ||
    activeMenu !== null ||
    isMenuOpen;

  const handleNavClick = (label: string) => {
    trackEvent("nav_click", { label, location: "navbar" });
    if (label === "Home" || label === "About BFriends" || label === "Contact" || label === "Help") {
      closeMenu();
    }
  };

  const handleMobileSubmenuClick = (label: string, menuId: NavColumnId) => {
    trackEvent("nav_click", {
      label,
      location:
        menuId === "about"
          ? "dropdown_about"
          : menuId === "programs"
            ? "dropdown_programs"
            : menuId === "treatments"
              ? "dropdown_treatments"
              : "dropdown_community",
    });
    closeMenu();
  };

  const dropdownItems =
    activeMenu === "programs"
      ? programItems
      : activeMenu === "treatments"
        ? treatmentItems
        : [...(navColumns.find((c) => c.id === activeMenu)?.items ?? [])];

  const isProgramsDropdown = activeMenu === "programs";
  const isTreatmentsDropdown = activeMenu === "treatments";
  const isDropdownWithImages = isProgramsDropdown || isTreatmentsDropdown;

  return (
    <>
      {(isMenuOpen || activeMenu !== null) && (
        <div
          className={styles.mobileOverlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div ref={navRef} className={styles.navRoot}>
        <div className={styles.navWrapper}>
          <div
            className={`${styles.navShell} ${solidBg ? styles.navShellSolid : ""}`}
          >
            <div className={styles.navbarMain}>
              <div ref={mainContainerRef} className={styles.mainContainer}>
              <div className={styles.left}>
                <button
                  type="button"
                  className={`${styles.menuTop} ${styles.navMainLink} ${styles.navMainLinkPlain} ${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ""}`}
                  onClick={() => {
                    trackEvent("nav_click", {
                      label: isMenuOpen ? "menu_close" : "menu_open",
                      location: "navbar",
                    });
                    toggleMenuPanel();
                  }}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  <span className={styles.menuToggleIcon} aria-hidden>
                    <span className={styles.menuLine} />
                    <span className={styles.menuLine} />
                  </span>
                  <span className={styles.menuToggleLabel} aria-hidden>
                    <span
                      className={`${styles.menuToggleLabelTrack} ${isMenuOpen ? styles.menuToggleLabelOpen : ""}`}
                    >
                      <span>Menu</span>
                      <span>Close</span>
                    </span>
                  </span>
                </button>
                <div
                  className={`${styles.menuTop} ${styles.navMainLink} ${styles.navMainLinkPlain} ${styles.languageToggle} ${styles.navMainDesktopOnly}`}
                  aria-label={`Language: ${CURRENT_LANGUAGE.name}`}
                >
                  <span className={styles.languageFlag}>
                    <Image
                      src={CURRENT_LANGUAGE.flagSrc}
                      alt={CURRENT_LANGUAGE.flagAlt}
                      width={18}
                      height={18}
                      className={styles.languageFlagImg}
                    />
                  </span>
                  <span className={styles.languageName}>{CURRENT_LANGUAGE.name}</span>
                </div>
              </div>

              <div className={styles.center}>
                <Link
                  href="/"
                  className={styles.logoLink}
                  aria-label="BFriends Home"
                  onClick={() => {
                    trackEvent("nav_click", { label: "logo", location: "navbar" });
                    closeMenu();
                  }}
                >
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

              <div className={styles.right}>
                <Button
                  href={helpNavItem.href}
                  underline="hover"
                  className={styles.navCta}
                  onClick={() => {
                    trackEvent("nav_click", { label: "help", location: "navbar" });
                    closeMenu();
                  }}
                >
                  {helpNavItem.label}
                </Button>
                <Button
                  href={BOOK_NOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  className={styles.navCta}
                  onClick={() => {
                    trackEvent("cta_click", { label: "book_now", location: "navbar" });
                    closeMenu();
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop: navbar-bottom + dropdown */}
          {isMenuOpen && (
            <div className={styles.navbarBottom}>
              <MenuGrid
                pathname={pathname}
                activeMenu={activeMenu}
                isProgramPage={isProgramPage}
                isTreatmentsPage={isTreatmentsPage}
                isAboutPage={isAboutPage}
                isMembershipPage={isMembershipPage}
                isCommunityPage={isCommunityPage}
                isContactPage={isContactPage}
                onNavClick={handleNavClick}
                onToggleMenu={toggleMenu}
              />
            </div>
          )}

          {activeMenu !== null && (
            <div className={styles.dropdown}>
              <div
                className={`${styles.dropdownMainContainer} ${
                  isDropdownWithImages
                    ? styles.dropdownMainContainerPrograms
                    : styles.dropdownMainContainerCompact
                }`}
              >
                {dropdownItems.map((item) => (
                  <div
                    key={item.href}
                    className={`${styles.linkContainer} ${
                      isDropdownWithImages
                        ? styles.linkContainerPrograms
                        : styles.linkContainerCompact
                    }`}
                  >
                    <Link
                      href={item.href}
                      className={`${styles.link} ${
                        isDropdownWithImages ? styles.linkPrograms : styles.linkCompact
                      }`}
                      onClick={() => {
                        trackEvent("nav_click", {
                          label: item.label,
                          location:
                            activeMenu === "about"
                              ? "dropdown_about"
                              : activeMenu === "programs"
                                ? "dropdown_programs"
                                : activeMenu === "treatments"
                                  ? "dropdown_treatments"
                                  : "dropdown_community",
                        });
                        closeMenu();
                      }}
                    >
                      {isDropdownWithImages && (
                        <span
                          className={`${styles.linkImage} ${!item.image ? styles.linkImagePlaceholder : ""}`}
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt=""
                              width={400}
                              height={240}
                              className={styles.linkImageImg}
                              sizes="(max-width: 1660px) calc((100vw - 80px - 120px) / 5), 280px"
                            />
                          ) : null}
                        </span>
                      )}
                      {item.labelPrimary && item.labelSecondary ? (
                        <span className={styles.linkLabel}>
                          <span className={styles.linkLabelPrimary}>{item.labelPrimary}</span>
                          <span className={styles.linkLabelSecondary}>{item.labelSecondary}</span>
                        </span>
                      ) : (
                        <span className={styles.linkLabel}>{item.label}</span>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>

        {/* Mobile: side panel */}
        {isMenuOpen && (
          <div className={styles.navBottomMobile}>
            <div className={styles.navBottomMobileMenu}>
              <MobileMenuList
                pathname={pathname}
                activeMenu={activeMenu}
                isProgramPage={isProgramPage}
                isTreatmentsPage={isTreatmentsPage}
                isAboutPage={isAboutPage}
                isMembershipPage={isMembershipPage}
                isCommunityPage={isCommunityPage}
                isContactPage={isContactPage}
                programItems={programItems}
                treatmentItems={treatmentItems}
                onNavClick={handleNavClick}
                onToggleMenu={toggleMenu}
                onItemClick={handleMobileSubmenuClick}
              />
            </div>
            <div className={styles.navBottomMobileActions}>
              <Button
                href={helpNavItem.href}
                underline="hover"
                className={styles.navCta}
                onClick={() => {
                  trackEvent("nav_click", { label: "help", location: "navbar" });
                  closeMenu();
                }}
              >
                {helpNavItem.label}
              </Button>
              <Button
                href={BOOK_NOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                className={styles.navCta}
                onClick={() => {
                  trackEvent("cta_click", { label: "book_now", location: "navbar" });
                  closeMenu();
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
