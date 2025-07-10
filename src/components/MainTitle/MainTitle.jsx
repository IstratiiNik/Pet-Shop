import React from "react";
import styles from "./MainTitle.module.scss";
import { Link } from "react-router-dom";

const MainTitle = () => {
  return (
    <section className={styles.mainTitle}>
      <div className={styles.container}>
        <h1>
          Amazing Discounts <br /> on Pets Products!
        </h1>
        <Link to={"/products"}>
          <button className={styles.heroButton}>Check out</button>
        </Link>
      </div>
    </section>
  );
};

export default MainTitle;
