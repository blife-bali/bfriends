"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { trackEvent } from "@/lib/gtag";
import FooterSubscribe from "./FooterSubscribe";

interface ProgramLink {
  name: string;
  slug: string;
  image?: string | null;
  sort?: number;
}

interface EcosystemLink {
  name: string;
  href: string;
}

function FooterSection({
  programs,
  ecosystemLinks,
}: {
  programs: ProgramLink[];
  ecosystemLinks: EcosystemLink[];
}) {
  return (
    <section className={styles.footerSection}>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img
            src="/images/icons/logo-default.svg"
            alt="BFriends"
            className={styles.logoImage}
          />
        </div>

        <div className={styles.footerMenuGrid}>
          <div className={styles.footerColumn}>
            <FooterSubscribe />
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerLinksGroup}>
              <h4 className={styles.footerTitle}>Daewoong Bali Ecosystem</h4>
              <nav>
                {ecosystemLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                    onClick={() =>
                      trackEvent("footer_click", {
                        label: item.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
                        category: "ecosystem",
                      })
                    }
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerLinksGroup}>
              <h4 className={styles.footerTitle}>About BFriends</h4>
              <nav>
                <Link
                  href="/about/journey"
                  className={styles.footerLink}
                  onClick={() => trackEvent("footer_click", { label: "friends_journey", category: "page" })}
                >
                  Friends Journey
                </Link>
                <Link
                  href="/about/facilities"
                  className={styles.footerLink}
                  onClick={() => trackEvent("footer_click", { label: "facilities", category: "page" })}
                >
                  Facilities
                </Link>
                <Link
                  href="/about/staff"
                  className={styles.footerLink}
                  onClick={() => trackEvent("footer_click", { label: "our_staff", category: "page" })}
                >
                  Our Staff
                </Link>
              </nav>
            </div>
            <div className={styles.footerLinksGroup}>
              <h4 className={styles.footerTitle}>Journal</h4>
              <nav>
                <Link
                  href="/community/event-workshop"
                  className={styles.footerLink}
                  onClick={() => trackEvent("footer_click", { label: "event_workshop", category: "community" })}
                >
                  Event & Workshop
                </Link>
                <Link
                  href="/community/journal"
                  className={styles.footerLink}
                  onClick={() => trackEvent("footer_click", { label: "bfriends_journal", category: "community" })}
                >
                  BFriends Journal
                </Link>
              </nav>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerPrograms}>
              <h4 className={styles.footerTitle}>Programs</h4>
              <nav>
                {programs.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className={styles.footerLink}
                    onClick={() => trackEvent("footer_click", { label: program.name, category: "program" })}
                  >
                    {program.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className={styles.footerCopyright}>
          <span className={styles.copyrightLine} aria-hidden="true" />
          <span className={styles.copyrightText}>© 2025 BFriends. All Rights Reserved.</span>
          <span className={styles.copyrightLine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const [programs, setPrograms] = useState<ProgramLink[]>([]);
  const [ecosystemLinks, setEcosystemLinks] = useState<EcosystemLink[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadFooterData() {
      try {
        const [programsResponse, ecosystemResponse] = await Promise.all([
          fetch("/api/programs", { cache: "no-store" }),
          fetch("/api/ecosystem", { cache: "no-store" }),
        ]);

        if (!isMounted) return;

        if (programsResponse.ok) {
          const programsData: ProgramLink[] = await programsResponse.json();
          setPrograms(programsData);
        } else {
          setPrograms([]);
        }

        if (ecosystemResponse.ok) {
          const ecosystemData: EcosystemLink[] = await ecosystemResponse.json();
          setEcosystemLinks(ecosystemData);
        } else {
          setEcosystemLinks([]);
        }
      } catch {
        if (!isMounted) return;
        setPrograms([]);
        setEcosystemLinks([]);
      }
    }

    loadFooterData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer>
      <FooterSection programs={programs} ecosystemLinks={ecosystemLinks} />
    </footer>
  );
}
