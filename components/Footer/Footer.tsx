"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import styles from "./Footer.module.css";
import locationStyles from "./Location.module.css";
import subscribeStyles from "./Subscribe.module.css";
import { programsData } from "@/lib/programs-data";

import Button from "@/components/ui/Button/Button";

interface FriendPoint {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const friendPoints: FriendPoint[] = [
  {
    id: "flow",
    title: "Flow",
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
function SubscriptionSection() {
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
      } catch (error) {
        console.error("Error submitting form:", error);
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
          {[...programsData, ...programsData].map((program, index) => (
            <div key={`${program.name}-${index}`} className={subscribeStyles.marqueeItem}>
              <div className={subscribeStyles.marqueeImageContainer}>
                <Image 
                  src={program.image} 
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
          {[...programsData, ...programsData].map((program, index) => (
            <div key={`${program.name}-${index}`} className={subscribeStyles.marqueeItem}>
              <div className={subscribeStyles.marqueeImageContainer}>
                <Image 
                  src={program.image} 
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
                variant="border" 
                disabled={isSubmitting} 
                color="var(--color-white-100)"
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
                icon={<ArrowUpRight size={16} />}
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

import { MessageCircle, Mail, Instagram as InstagramIcon } from "lucide-react";

// Footer Section Component
function FooterSection() {
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
                href="https://instagram.com/blive.bali" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footerContactItem}
              >
                <InstagramIcon size={16} />
                <span>Instagram: blive.bali</span>
              </a>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footerContactItem}
              >
                <MessageCircle size={16} />
                <span>WhatsApp: +62 812 3456 7890</span>
              </a>
              <a 
                href="mailto:hello@bfriends.id" 
                className={styles.footerContactItem}
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
              <Link href="/about/philosophy" className={styles.footerLink}>Our Philosophy</Link>
              <Link href="/about/journey" className={styles.footerLink}>Customer Journey</Link>
            </nav>
          </div>
          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerTitle}>BLife Ecosystem</h4>
            <nav>
              <a href="https://bwork.id" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>BWork</a>
              <a href="https://bnesta.id" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>BNesta</a>
              <a href="https://blive.id" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>BLive</a>
            </nav>
          </div>
        </div>

        {/* Column 3: Programs */}
        <div className={styles.footerColumn}>
          <div className={styles.footerPrograms}>
            <h4 className={styles.footerTitle}>Programs</h4>
            <nav>
              <Link href="/programs/flow" className={styles.footerLink}>Flow</Link>
              <Link href="/programs/restore" className={styles.footerLink}>Restore</Link>
              <Link href="/programs/integrate" className={styles.footerLink}>Integrate</Link>
              <Link href="/programs/enhance" className={styles.footerLink}>Enhance</Link>
              <Link href="/programs/nurture" className={styles.footerLink}>Nurture</Link>
              <Link href="/programs/dare" className={styles.footerLink}>Dare</Link>
            </nav>
          </div>
        </div>

        {/* Column 4: Membership + Community */}
        <div className={styles.footerColumn}>
          <div className={styles.footerCommunity}>
            <h4 className={styles.footerTitle}>Membership</h4>
            <nav>
              <Link href="/membership/passport" className={styles.footerLink}>BFriends Passport</Link>
              <Link href="/membership/charm" className={styles.footerLink}>Charm</Link>
            </nav>
          </div>
          <div className={styles.footerCommunity}>
            <h4 className={styles.footerTitle}>Community</h4>
            <nav>
              <Link href="/community/events" className={styles.footerLink}>Event & Workshop</Link>
              <Link href="/community/news" className={styles.footerLink}>BLife Ecosystem News</Link>
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
  return (
    <footer>
      <LocationSection />
      <SubscriptionSection />
      <FooterSection />
    </footer>
  );
}
