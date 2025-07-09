import React from "react";
import styles from "./DiscountForm.module.scss";
import FormAction from "../FormAction/FormAction";

const DiscountForm = () => {
  return (
    <section className={styles.discount}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>5% off on the first order</h2>
          <div className={styles.content}>
            <div className={styles.image} />
            <div className={styles.form}>
              <FormAction />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountForm;
