"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import styles from "./Footer.module.css";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/site-contact";
import { trackEvent } from "@/lib/gtag";

interface ProgramLink {
  name: string;
  slug: string;
  image?: string | null;
}

function FooterSection({ programs }: { programs: ProgramLink[] }) {
  return (
    <section className={styles.footerSection}>
      {/* Menu Grid */}
      <div className={styles.footerMenuGrid}>
        {/* Column 1: Location + Contact */}
        <div className={styles.footerColumn}>
          <div className={styles.footerLocation}>
            <h4 className={styles.footerTitle}>Location</h4>
            <address className={styles.footerAddress}>
              Jl. Teuku Umar Barat No.989x,<br />
              Kerobokan Kelod, Kec. Kuta Utara,<br />
              Kabupaten Badung, Bali 80117
            </address>
          </div>
          <div className={styles.footerContact}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <nav className={styles.menuWrapper}>
              <a
                href="https://instagram.com/bfriends.bali/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerContactItem}
                onClick={() => trackEvent('footer_click', { label: 'instagram', category: 'social' })}
              >
                <Instagram size={16} />
                <span>Instagram: bfriends.bali</span>
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className={styles.footerContactItem}
                onClick={() => trackEvent('footer_click', { label: 'phone', category: 'contact' })}
              >
                <Phone size={16} />
                <span>Phone: {CONTACT_PHONE_DISPLAY}</span>
              </a>
              <a
                href="mailto:hello@bfriends.id"
                className={styles.footerContactItem}
                onClick={() => trackEvent('footer_click', { label: 'email', category: 'contact' })}
              >
                <Mail size={16} />
                <span>Email: hello@bfriends.id</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Column 2: About + Ecosystem */}
        <div className={styles.footerColumn}>
          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerTitle}>About BFriends</h4>
            <nav>
              <Link
                href="/about"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'about_bfriends', category: 'page' })}
              >
                About BFriends
              </Link>
              <Link
                href="/about/journey"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'customer_journey', category: 'page' })}
              >
                BFriends Journey
              </Link>
            </nav>
          </div>
          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerTitle}>BLife Ecosystem</h4>
            <nav>
              <a
                href="https://bwork.id"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'bwork', category: 'ecosystem' })}
              >
                BWork
              </a>
              <a
                href="https://bnesta.id"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'bnesta', category: 'ecosystem' })}
              >
                BNesta
              </a>
              <a
                href="https://blive.id"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'blive', category: 'ecosystem' })}
              >
                BLive
              </a>
            </nav>
          </div>
        </div>

        {/* Column 3: Programs */}
        <div className={styles.footerColumn}>
          <div className={styles.footerPrograms}>
            <h4 className={styles.footerTitle}>Programs</h4>
            <nav>
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className={styles.footerLink}
                  onClick={() => trackEvent('footer_click', { label: program.name, category: 'program' })}
                >
                  {program.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Column 4: Membership + Community */}
        <div className={styles.footerColumn}>
          <div className={styles.footerCommunity}>
            <h4 className={styles.footerTitle}>Membership</h4>
            <nav>
              <Link
                href="/membership/passport"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'bfriends_passport', category: 'membership' })}
              >
                BFriends Passport
              </Link>
              <Link
                href="/membership/charm"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'charm', category: 'membership' })}
              >
                Charm
              </Link>
            </nav>
          </div>
          <div className={styles.footerCommunity}>
            <h4 className={styles.footerTitle}>Community</h4>
            <nav>
              <Link
                href="/community/events"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'event_workshop', category: 'community' })}
              >
                Event & Workshop
              </Link>
              <Link
                href="/community/news"
                className={styles.footerLink}
                onClick={() => trackEvent('footer_click', { label: 'ecosystem_news', category: 'community' })}
              >
                BLife Ecosystem News
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div className={styles.footerClosing}>
        <div className={styles.logoContainer}>
        <div className={styles.footerLogo}>
          <img 
            src="/images/icons/logo-default.svg"
            alt="BFriends" 
            className={styles.logoImage}
          />
        </div>
        <div className={styles.logoBorder}></div>
        <div className={styles.footerTagline}>
          Which <em>Friend</em> Do <br/> You Need Today?
        </div>
        </div>
        <div className={styles.footerCopyright}>
          © 2025 BFriends. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const [programs, setPrograms] = useState<ProgramLink[]>([]);

  useEffect(() => {
    let cancelled = false;
    const loadPrograms = async () => {
      try {
        const res = await fetch('/api/programs');
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;
        if (!cancelled) {
          setPrograms(data);
        }
      } catch {
        // Keep static fallback data.
      }
    };
    loadPrograms();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer>
      <FooterSection programs={programs} />
    </footer>
  );
}
