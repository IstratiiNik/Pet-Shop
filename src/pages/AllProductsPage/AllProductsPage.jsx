import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/selectors";
import { fetchProductsAll } from "../../redux/petSlice";
import { calculateDiscountPercent } from "../../utils/discount";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./AllProductsPage.module.scss";
import { PulseLoader } from "react-spinners";

const AllProductsPage = () => {
  // Get products from Redux store
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchProductsAll());
  }, [dispatch]);

  // Loader component for loading state
  const Loader = () => {
    return (
      <div>
        <PulseLoader color="#36d7b7" size={15} margin={2} />
      </div>
    );
  };

  // Show loader if products are not loaded yet
  if (!products.length) {
    return <Loader />;
  }

  // Render all products list
  return (
    <section className={styles.products}>
      <h2 className={styles.title}>All products</h2>
      <ul className={styles.list}>
        {products.map(({ id, title, image, discont_price, price }) => {
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

export default AllProductsPage;
