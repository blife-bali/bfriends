"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Footer.module.css";
import { submitNewsletterEmail } from "@/lib/newsletter-subscribe";
import { trackEvent } from "@/lib/gtag";
import FooterSocialIcons from "./FooterSocialIcons";

export default function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitNewsletterEmail(email);
      setIsSubmitted(true);
      setEmail("");
      trackEvent("form_submit", { form_name: "newsletter_footer_column", success: true });
    } catch (error) {
      console.error("Error submitting newsletter:", error);
      trackEvent("form_submit", { form_name: "newsletter_footer_column", success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.footerSubscribe}>
      <h4 className={styles.footerSubscribeTitle}>Contact Us</h4>
      <p className={styles.footerSubscribeText}>
        Subscribe for BFriends news, events, and updates from Bali.
      </p>

      {isSubmitted ? (
        <p className={styles.subscribeSuccess}>Thank you for subscribing.</p>
      ) : (
        <form className={styles.subscribeForm} onSubmit={handleSubmit}>
          <div className={styles.subscribeField}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address *"
              required
              className={styles.subscribeInput}
              disabled={isSubmitting}
              aria-label="Email address"
            />
            <button
              type="submit"
              className={styles.subscribeSubmit}
              disabled={isSubmitting}
              aria-label={isSubmitting ? "Submitting" : "Subscribe"}
            >
              <ArrowRight size={20} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </form>
      )}

      <FooterSocialIcons
        onIconClick={(id) => trackEvent("footer_click", { label: id, category: "social" })}
      />
    </div>
  );
}
