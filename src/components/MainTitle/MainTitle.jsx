import React from "react";
import styles from "./MainTitle.module.scss";

const MainTitle = () => {
  return (
    <section className={styles.mainTitle}>
      <div className={styles.container}>
        <h1>
          Amazing Discounts <br /> on Pets Products!
        </h1>
        <button className={styles.heroButton}>Check out</button>
      </div>
    </section>
  );
};

export default MainTitle;
