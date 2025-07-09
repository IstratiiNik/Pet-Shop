import React from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = ({
  id,
  image,
  title,
  discountPercent,
  discont_price,
  price,
}) => {
  // Render single product card
  return (
    <li key={id} className={styles.item}>
      <div className={styles.imageWrapper}>
        <img src={`http://localhost:3333${image}`} alt={title} />
        {/* Show discount badge if discount exists */}
        {discountPercent > 0 && (
          <div className={styles.discountBadge}>-{discountPercent}%</div>
        )}
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <div className={styles.price}>
          {discont_price ? (
            <>
              <span className={styles.discounted}>$ {discont_price}</span>
              <span className={styles.original}>$ {price}</span>
            </>
          ) : (
            <span>$ {price}</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
