import React from "react";
import styles from "./Footer.module.scss";
import Instagram from "../../assets/footer/instagram.svg";
import WhatsApp from "../../assets/footer/whatsapp.svg";

const Footer = () => {
  return (
    <footer>
      <h2>Contact</h2>
      <div className={styles.infoWrapper}>
        <div className={styles.infoItem}>
          <h3>Phone</h3>
          <p>+49 30 915-88492</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Socials</h3>
          <div className={styles.socialMedia}>
            <a href="https://www.instagram.com">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="https://www.whatsapp.com">
              <img src={WhatsApp} alt="Whatsapp" />
            </a>
          </div>
        </div>
        <div className={styles.infoItem}>
          <h3>Address</h3>
          <p>Wallstraẞe 9-13, 10179 Berlin, Deutschland</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Working Hours</h3>
          <p>24 hours a day</p>
        </div>
      </div>
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2269577847637!2d13.400717576164812!3d52.5112316368793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27dade5561%3A0x2454d91ffab308fa!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1suk!2sde!4v1751617090706!5m2!1suk!2sde"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location - Wallstraße 9-13, Berlin"
          aria-label="Google Maps with our location marked"
          importance="low"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
