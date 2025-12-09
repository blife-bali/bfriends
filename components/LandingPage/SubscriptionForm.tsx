"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SubscriptionForm.module.css";

import Button from "@/components/ui/Button/Button";

export default function SubscriptionForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      
      // Google Form submission details
      const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSclRqNzLi-46Dnn36_fYoOP1XCw9EAcIAt8U_xAEjHPuKQBGg/formResponse";
      const ENTRY_ID = "entry.18557205";

      const formData = new FormData();
      formData.append(ENTRY_ID, email);

      try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
          method: "POST",
          mode: "no-cors", // Required for Google Forms
          body: formData,
        });
        
        // We assume success because 'no-cors' gives an opaque response
      setIsSubmitted(true);
      setEmail("");
      } catch (error) {
        console.error("Error submitting form:", error);
        // Optionally handle error state here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className={styles.formContainer}>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className={styles.inputField}
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
              icon={<ArrowUpRight className="w-5 h-5" />}
            >
              {isSubmitting ? "Joining..." : "Join Waiting List"}
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.successContainer}
          >
            <div className={styles.successMessage}>
              <div className={styles.successIconWrapper}>
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className={styles.successTitle}>You're on the list!</h3>
              <p className={styles.successText}>
                Thank you for joining our movement. We'll keep you updated on our launch.
              </p>
            </div>
            
            <Button
              onClick={handleReset}
              variant="primary"
              fullWidth
              icon={<ArrowUpRight className="w-5 h-5" />}
            >
              Add another email
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
