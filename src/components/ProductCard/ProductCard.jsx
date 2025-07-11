import React from "react";
import styles from "./ProductCard.module.scss";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  image,
  title,
  discountPercent,
  discont_price,
  price,
}) => {
  const dispatch = useDispatch();
  // Render single product card
  return (
    <li key={id} className={styles.item}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${id}`}>
          <img src={`http://localhost:3333${image}`} alt={title} />
        </Link>
        {/* Show discount badge if discount exists */}
        {discountPercent > 0 && (
          <div className={styles.discountBadge}>-{discountPercent}%</div>
        )}
        {/* Buy button appears on hover */}
        <button
          className={styles.buyButton}
          onClick={() =>
            dispatch(
              addToCart({
                id,
                image,
                title,
                discont_price,
                price,
              })
            )
          }
        >
          Add to cart
        </button>
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
            <span className={styles.discounted}>$ {price}</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
