import React, { useEffect } from "react";
import styles from "../../components/Sale/Sale.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/selectors";
import { fetchProductsAll } from "../../redux/petSlice";
import { calculateDiscountPercent } from "../../utils/discount";
import ProductCard from "../../components/ProductCard/ProductCard";

const AllSalesPage = () => {
  // Get products from Redux store
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);

  // Filter products with a discount price
  const saleProducts = allProducts.filter(
    (product) => product.discont_price !== null
  );

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchProductsAll());
  }, [dispatch]);

  // Render sale products list
  return (
    <section className={styles.sale}>
      <header className={styles.header}>
        <h2>All sale</h2>
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

export default AllSalesPage;
