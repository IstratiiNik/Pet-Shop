import React from "react";
import styles from "./ErrorPage.module.scss";
import ErrorImg from "../../assets/404.png";
import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  // Render not found page
  return (
    <section className={styles.notFound}>
      <div className={styles.content}>
        <img className={styles.img} src={ErrorImg} alt="404" />
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.text}>
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <Link className={styles.link} to={ROUTES.MAIN}>
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
