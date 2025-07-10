import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = ({ items }) => (
  <nav className={styles.breadcrumbs}>
    {items.map((item, idx) => (
      <span key={idx} className={styles.crumb}>
        {item.to ? (
          <Link to={item.to}>{item.label}</Link>
        ) : (
          <span className={styles.active}>{item.label}</span>
        )}
        {idx < items.length - 1 && <span className={styles.separator}>—</span>}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
