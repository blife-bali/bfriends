"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/gtag";
import { mockContactPage } from "@/mock/contact";
import styles from "./form.module.css";

const INTEREST_OPTIONS = [
  { value: "", label: "What is this about? *" },
  { value: "general", label: "General question" },
  { value: "visit", label: "Planning a visit" },
  { value: "membership", label: "Membership" },
  { value: "programs", label: "Programmes" },
  { value: "other", label: "Something else" },
] as const;

const TITLE_OPTIONS = [
  { value: "", label: "Title" },
  { value: "mr", label: "Mr." },
  { value: "ms", label: "Ms." },
  { value: "mrs", label: "Mrs." },
  { value: "dr", label: "Dr." },
] as const;

type FormFields = {
  interest: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  privacyAccepted: boolean;
};

const emptyFields: FormFields = {
  interest: "",
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  privacyAccepted: false,
};

export default function Form() {
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !fields.privacyAccepted) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitted(true);
      setFields(emptyFields);
      trackEvent("form_submit", { form_name: "contact", success: true });
    } catch {
      trackEvent("form_submit", { form_name: "contact", success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>{mockContactPage.form_success_title}</p>
        <p className={styles.successText}>{mockContactPage.form_success_text}</p>
        <button type="button" className={styles.resetButton} onClick={() => setIsSubmitted(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.fieldBox}>
        <span className={styles.fieldLabel}>What is this about? *</span>
        <div className={styles.selectWrap}>
          <select
            name="interest"
            value={fields.interest}
            onChange={(e) => update("interest", e.target.value)}
            required
            className={`${styles.control} ${styles.select}`}
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value || "placeholder"} value={opt.value} disabled={!opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </label>

      <div className={styles.rowThree}>
        <label className={styles.fieldBox}>
          <span className={styles.fieldLabel}>Title</span>
          <div className={styles.selectWrap}>
            <select
              name="title"
              value={fields.title}
              onChange={(e) => update("title", e.target.value)}
              className={`${styles.control} ${styles.select}`}
            >
              {TITLE_OPTIONS.map((opt) => (
                <option key={opt.value || "placeholder"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className={styles.fieldBox}>
          <span className={styles.fieldLabel}>First Name *</span>
          <input
            type="text"
            name="firstName"
            value={fields.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            required
            autoComplete="given-name"
            className={styles.control}
          />
        </label>
        <label className={styles.fieldBox}>
          <span className={styles.fieldLabel}>Last Name *</span>
          <input
            type="text"
            name="lastName"
            value={fields.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            required
            autoComplete="family-name"
            className={styles.control}
          />
        </label>
      </div>

      <div className={styles.rowTwo}>
        <label className={styles.fieldBox}>
          <span className={styles.fieldLabel}>Email Address *</span>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            required
            autoComplete="email"
            className={styles.control}
          />
        </label>
        <label className={styles.fieldBox}>
          <span className={styles.fieldLabel}>Phone Number</span>
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            className={styles.control}
          />
        </label>
      </div>

      <label className={styles.fieldBox}>
        <span className={styles.fieldLabel}>Your message *</span>
        <textarea
          name="notes"
          value={fields.notes}
          onChange={(e) => update("notes", e.target.value)}
          required
          rows={6}
          className={`${styles.control} ${styles.textarea}`}
        />
      </label>

      <div className={styles.footer}>
        <div className={styles.toggles}>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={fields.privacyAccepted}
              onChange={(e) => update("privacyAccepted", e.target.checked)}
              required
              className={styles.toggleInput}
            />
            <span className={`${styles.toggleTrack} ${styles.toggleTrackMuted}`} aria-hidden />
            <span className={styles.toggleText}>
              I agree to how BFriends handles my details (see{" "}
              <Link href="/faq" className={styles.inlineLink}>
                Privacy Policy
              </Link>
              ). *
            </span>
          </label>
        </div>
        <button type="submit" className={styles.submit} disabled={isSubmitting || !fields.privacyAccepted}>
          {isSubmitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
