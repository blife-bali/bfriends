"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { trackEvent } from "@/lib/gtag";
import styles from "./SiteNewsletterCta.module.css";

interface ProgramLink {
  name: string;
  slug: string;
  image?: string | null;
}

/** Newsletter + headline CTA above the site footer (home & philosophy only). */
export default function SiteNewsletterCta() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [programs, setPrograms] = useState<ProgramLink[]>([]);

  useEffect(() => {
    let cancelled = false;
    const loadPrograms = async () => {
      try {
        const res = await fetch("/api/programs");
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;
        if (!cancelled) {
          setPrograms(data);
        }
      } catch {
        // Marquee hidden; optional imagery only
      }
    };
    loadPrograms();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && !isSubmitting) {
      setIsSubmitting(true);

      const GOOGLE_FORM_ACTION_URL =
        "https://docs.google.com/forms/d/e/1FAIpQLSclRqNzLi-46Dnn36_fYoOP1XCw9EAcIAt8U_xAEjHPuKQBGg/formResponse";
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
        trackEvent("form_submit", { form_name: "newsletter_footer", success: true });
      } catch (error) {
        console.error("Error submitting form:", error);
        trackEvent("form_submit", { form_name: "newsletter_footer", success: false });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className={styles.subscriptionSection} aria-labelledby="site-newsletter-heading">
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marqueeContent} ${styles.top}`}>
          {[...programs, ...programs].map((program, index) => (
            <div key={`${program.name}-${index}`} className={styles.marqueeItem}>
              <div className={styles.marqueeImageContainer}>
                <Image
                  src={program.image || "/images/programs/D.webp"}
                  alt={program.name}
                  width={160}
                  height={96}
                />
              </div>
              <div className={styles.marqueeTextContainer}>
                <span className={styles.marqueePoint}>{program.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.marqueeContent} ${styles.bottom}`}>
          {[...programs, ...programs].map((program, index) => (
            <div key={`${program.name}-${index}`} className={styles.marqueeItem}>
              <div className={styles.marqueeImageContainer}>
                <Image
                  src={program.image || "/images/programs/D.webp"}
                  alt={program.name}
                  width={160}
                  height={96}
                />
              </div>
              <div className={styles.marqueeTextContainer}>
                <span className={styles.marqueePoint}>{program.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subscribeWrapper}>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterContent}>
            <h2 id="site-newsletter-heading" className={styles.heading}>
              A <em>Wellness Journey</em> That Begins
              <br />
              With Becoming A Friend To Yourself.
            </h2>
            <p className={styles.subheading}>
              Reconnecting with yourself is essential for a healthier, balanced life. BFriends is your
              dependable companion on this transformative journey, providing support and guidance as
              you explore your inner self and foster a sense of peace.
            </p>
            {!isSubmitted ? (
              <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                <div className={styles.newsletterInputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={styles.newsletterInput}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.buttonWrap}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    color="var(--color-white-100)"
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className={styles.successMessage}>
                <Check className={styles.successIcon} size={20} />
                <span>Email successfully sent!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}