import { Car, MapPin, Plane } from "lucide-react";
import styles from "./SiteLocation.module.css";

/** Embedded map and band above the site footer (home & philosophy only). */
export default function SiteLocation() {
  return (
    <section className={styles.locationSection} aria-label="BFriends location">
      <div className={styles.contentWrapper}>
        <div className={styles.locationHeader}>
          <p className={styles.locationEyebrow}>Find Us</p>
          <h2 className={styles.locationTitle}>Start Your Wellness Journey</h2>
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.123456789!2d115.1769167!3d-8.6737222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2470066210b17:0xc0f7dfddf84e65e1!2sBFriends!5e0!3m2!1sen!2sid!4v1699999999999"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.map}
            title="BFriends on Google Maps"
          />
        </div>

        <ul className={styles.pointsList} aria-label="Location details">
          <li className={styles.pointItem}>
            <MapPin className={styles.pointIcon} aria-hidden="true" />
            <a
              className={styles.pointLink}
              href="https://www.google.com/maps/search/?api=1&query=Jl.%20Teuku%20Umar%20Barat%20No.989x%2C%20Kerobokan%20Kelod%2C%20Kec.%20Kuta%20Utara%2C%20Kabupaten%20Badung%2C%20Bali%2080117"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jl. Teuku Umar Barat No.989x, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80117
            </a>
          </li>
          <li className={styles.pointItem}>
            <Plane className={styles.pointIcon} aria-hidden="true" />
            <a
              className={styles.pointLink}
              href="https://www.google.com/maps/search/?api=1&query=Ngurah%20Rai%20International%20Airport%20(DPS)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ngurah Rai International Airport (DPS)
            </a>
          </li>
          <li className={styles.pointItem}>
            <Car className={styles.pointIcon} aria-hidden="true" />
            <p className={styles.pointText}>30 minutes drive from Ngurah Rai Int. Airport</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
