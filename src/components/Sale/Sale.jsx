import React from "react";
import styles from "./Sale.module.scss";
import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/selectors";
import { calculateDiscountPercent } from "../../utils/discount";

const Sale = () => {
  const allProducts = useSelector(selectProducts);
  const saleProducts = allProducts
    .filter((product) => product.discont_price !== null)
    .slice(0, 4);

  return (
    <section className={styles.sale}>
      <header className={styles.header}>
        <h2>Sale</h2>
        <div className={styles.divider}></div>
        <Link className={styles.link} to={ROUTES.SALES}>
          All sales
        </Link>
      </header>
      <ul className={styles.list}>
        {saleProducts.map(({ id, image, title, discont_price, price }) => {
          const discountPercent = calculateDiscountPercent(
            price,
            discont_price
          );
          return (
            <ProductCard
              key={id}
              id={id}
              title={title}
              image={image}
              discountPercent={discountPercent}
              discont_price={discont_price}
              price={price}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Sale;
