"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import styles from "./Footer.module.css";

import Button from "@/components/ui/Button/Button";

export default function Footer() {
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
          mode: "no-cors",
          body: formData,
        });
        
        setIsSubmitted(true);
        setEmail("");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Logo & Address */}
          <div className={styles.column1}>
            <img 
              src="/images/icons/logo-bfriends hor.png" 
              alt="bfriends" 
              className={styles.logo} 

            />
            <a 
              href="https://www.google.com/maps/place/BFriends/@-8.6737222,115.1769167,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd2470066210b17:0xc0f7dfddf84e65e1!8m2!3d-8.6737222!4d115.1769167!16s%2Fg%2F11x1g61ntz?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.address}
            >
              Jl. Teuku Umar Barat No.989x,
              Kerobokan Kelod, Kec. Kuta Utara,
              Kabupaten Badung, Bali 80117
            </a>
          </div>

          {/* Column 2: BLife Ecosystem */}
          <div className={styles.column}>
            <h3 className={styles.heading}>BLife Ecosystem</h3>
            <nav className={styles.menuList}>
              <a href="https://bwork.id" target="_blank" rel="noopener noreferrer" className={styles.menuItem}>BWork</a>
              <a href="https://bnesta.id" target="_blank" rel="noopener noreferrer" className={styles.menuItem}>BNesta</a>
              <a href="https://blive.id" target="_blank" rel="noopener noreferrer" className={styles.menuItem}>BLive</a>
            </nav>
          </div>

          {/* Column 3: Contact Us */}
          <div className={styles.column}>
            <h3 className={styles.heading}>Contact Us</h3>
            <nav className={styles.menuList}>
              <a href="mailto:hello@bfriends.id" className={styles.menuItem}>
                hello@bfriends.id
              </a>
            </nav>
          </div>

          {/* Column 4: Newsletter */}
          <div className={styles.column2}>
            <h3 className={styles.heading}>Get our latest updates,<i className="font-semibold text-bfriends-orange-100"> friends!</i></h3>
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
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting} 
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                  icon={<ArrowUpRight size={16} />}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            ) : (
              <div className={styles.successMessage}>
                <Check className={styles.successIcon} size={20} />
                <span>Email successfully sent!</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} BFriends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
