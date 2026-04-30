"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import styles from "./Footer.module.css";
import locationStyles from "./Location.module.css";
import subscribeStyles from "./Subscribe.module.css";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/site-contact";
import { trackEvent } from "@/lib/gtag";

import Button from "@/components/ui/Button/Button";

interface FriendPoint {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ProgramLink {
  name: string;
  slug: string;
  image?: string | null;
}

const friendPoints: FriendPoint[] = [
  {
    id: "fitness",
    title: "Fitness",
    description: "Experience the art of mindful movement",
    imageUrl: "/images/flow-point.jpg",
  },
  {
    id: "restore",
    title: "Restore",
    description: "Recover and rejuvenate your body",
    imageUrl: "/images/restore-point.jpg",
  },
  {
    id: "energize",
    title: "Energize",
    description: "Boost your vitality and fitness",
    imageUrl: "/images/energize-point.jpg",
  },
  {
    id: "connect",
    title: "Connect",
    description: "Build meaningful friendships",
    imageUrl: "/images/connect-point.jpg",
  },
  {
    id: "grow",
    title: "Grow",
    description: "Personal and community development",
    imageUrl: "/images/grow-point.jpg",
  },
];

// Location Section Component
function LocationSection() {
  return (
    <section className={locationStyles.locationSection}>
      <div className={locationStyles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.123456789!2d115.1769167!3d-8.6737222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2470066210b17:0xc0f7dfddf84e65e1!2sBFriends!5e0!3m2!1sen!2sid!4v1699999999999"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={locationStyles.map}
        />
      </div>
    </section>
  );
}

// Subscription Section Component
function SubscriptionSection({ programs }: { programs: ProgramLink[] }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      
      const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSclRqNzLi-46Dnn36_fYoOP1XCw9EAcIAt8U_xAEjHPuKQBGg/formResponse";
      const ENTRY_ID = "entry.18557205";

      const formData = new FormData();
      formData.append(ENTRY_ID, email);

      try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        setIsSubmitted(true);
        setEmail("");
        trackEvent('form_submit', { form_name: 'newsletter_footer', success: true });
      } catch (error) {
        console.error("Error submitting form:", error);
        trackEvent('form_submit', { form_name: 'newsletter_footer', success: false });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className={subscribeStyles.subscriptionSection}>
      {/* Marquee Section - Two Lines */}
      <div className={subscribeStyles.marqueeContainer}>
        <div className={`${subscribeStyles.marqueeContent} ${subscribeStyles.top}`}>
          {[...programs, ...programs].map((program, index) => (
            <div key={`${program.name}-${index}`} className={subscribeStyles.marqueeItem}>
              <div className={subscribeStyles.marqueeImageContainer}>
                <Image 
                  src={program.image || "/images/programs/D.webp"} 
                  alt={program.name}
                  width={160}
                  height={96}
                />
              </div>
              <div className={subscribeStyles.marqueeTextContainer}>
                <span className={subscribeStyles.marqueePoint}>{program.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`${subscribeStyles.marqueeContent} ${subscribeStyles.bottom}`}>
          {[...programs, ...programs].map((program, index) => (
            <div key={`${program.name}-${index}`} className={subscribeStyles.marqueeItem}>
              <div className={subscribeStyles.marqueeImageContainer}>
                <Image 
                  src={program.image || "/images/programs/D.webp"} 
                  alt={program.name}
                  width={160}
                  height={96}
                />
              </div>
              <div className={subscribeStyles.marqueeTextContainer}>
                <span className={subscribeStyles.marqueePoint}>{program.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Form */}
      <div className={subscribeStyles.subscribeWrapper}>
        <div className={subscribeStyles.newsletterContainer}>
          <div className={subscribeStyles.newsletterContent}>
          <h2 className={subscribeStyles.heading}>
            A <em>Wellness Journey</em> That Begins
            <br />
            With Becoming A Friend To Yourself.
          </h2>
          <p className={subscribeStyles.subheading}>
            Reconnecting with yourself is essential for a healthier, balanced life. BFriends is your dependable companion on this transformative journey, providing support and guidance as you explore your inner self and foster a sense of peace.
          </p>
          {!isSubmitted ? (
            <form className={subscribeStyles.newsletterForm} onSubmit={handleSubmit}>
              <div className={subscribeStyles.newsletterInputWrapper}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className={subscribeStyles.newsletterInput}
                  disabled={isSubmitting}
                />
              </div>
              <div className={subscribeStyles.buttonWrap}>
<Button
                type="submit"
                disabled={isSubmitting}
                color="var(--color-white-100)"
                showIcon
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
              </div>
            </form>
          ) : (
            <div className={subscribeStyles.successMessage}>
              <Check className={subscribeStyles.successIcon} size={20} />
              <span>Email successfully sent!</span>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}

// Footer Section Component
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
            src="/images/icons/logo-bfriends-hor.png" 
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

// Main Footer Component
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
      <LocationSection />
      <SubscriptionSection programs={programs} />
      <FooterSection programs={programs} />
    </footer>
  );
}
