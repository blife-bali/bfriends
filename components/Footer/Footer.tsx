"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { trackEvent } from "@/lib/gtag";
import FooterSocialIcons from "./FooterSocialIcons";
import {
  footerAboutLinks,
  footerContactLinks,
  footerEcosystemLinks,
  type FooterLink,
} from "@/lib/footer-config";

function FooterLink({
  href,
  label,
  external,
  category,
}: {
  href: string;
  label: string;
  external?: boolean;
  category: "social" | "ecosystem" | "program" | "membership" | "community" | "page" | "contact";
}) {
  const trackClick = () =>
    trackEvent("footer_click", {
      label: label.toLowerCase().replace(/[^a-z0-9]/g, ""),
      category,
    });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
        onClick={trackClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.footerLink} onClick={trackClick}>
      {label}
    </Link>
  );
}

function FooterLinksGroup({
  title,
  links,
  category,
  external,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
  category: "social" | "ecosystem" | "program" | "membership" | "community" | "page" | "contact";
  external?: boolean;
}) {
  return (
    <div className={styles.footerLinksGroup}>
      <h4 className={styles.footerTitle}>{title}</h4>
      <nav>
        {links.map((link) => (
          <FooterLink
            key={`${title}-${link.label}`}
            href={link.href}
            label={link.label}
            external={link.external ?? external}
            category={category}
          />
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  const [treatmentLinks, setTreatmentLinks] = useState<readonly FooterLink[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadTreatments() {
      try {
        const response = await fetch("/api/treatments", { cache: "no-store" });
        if (!response.ok) return;
        const data: { label: string; href: string }[] = await response.json();
        if (!isMounted) return;
        setTreatmentLinks(data.map((item) => ({ label: item.label, href: item.href })));
      } catch {
        if (isMounted) setTreatmentLinks([]);
      }
    }

    loadTreatments();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer>
      <section className={styles.footerSection}>
        <div className={styles.mainContainer}>
          <div className={styles.footerMenuGrid}>
            <div className={styles.footerColumn}>
              <div className={styles.logoContainer}>
                <img
                  src="/images/icons/logo-default.svg"
                  alt="BFriends"
                  className={styles.logoImage}
                />
              </div>
              <FooterLinksGroup
                title="Contact Us"
                links={footerContactLinks}
                category="contact"
                external
              />
              <div className={styles.footerSocialGroup}>
                <h4 className={styles.footerTitle}>Social Media</h4>
                <FooterSocialIcons
                  onIconClick={(id) => trackEvent("footer_click", { label: id, category: "social" })}
                />
              </div>
            </div>

            <FooterLinksGroup
              title="Daewoong Bali Ecosystem"
              links={footerEcosystemLinks}
              category="ecosystem"
              external
            />

            <FooterLinksGroup title="About BFriends" links={footerAboutLinks} category="page" />

            <FooterLinksGroup title="Treatments" links={treatmentLinks} category="page" />
          </div>

          <div className={styles.footerCopyright}>
            <span className={styles.copyrightLine} aria-hidden="true" />
            <span className={styles.copyrightText}>© 2025 BFriends. All Rights Reserved.</span>
            <span className={styles.copyrightLine} aria-hidden="true" />
          </div>
        </div>
      </section>
    </footer>
  );
}
