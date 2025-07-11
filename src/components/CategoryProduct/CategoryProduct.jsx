import React, { useEffect } from "react";
import styles from "./CategoryProduct.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentCategory,
  selectProductByCategory,
  selectProductsLoading,
} from "../../redux/selectors";
import { fetchCategoryById } from "../../redux/petSlice";
import ProductCard from "../ProductCard/ProductCard";
import { PulseLoader } from "react-spinners";

const CategoryProduct = () => {
  // Get categoryId from URL params
  const { categoryId } = useParams();

  // Redux hooks
  const dispatch = useDispatch();
  const productsByCategory = useSelector(selectProductByCategory);
  const isLoading = useSelector(selectProductsLoading);
  const currentCategory = useSelector(selectCurrentCategory);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategoryById(categoryId));
  }, [dispatch, categoryId]);

  // Show loader while fetching data
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <PulseLoader color="#36d7b7" size={15} margin={2} />
      </div>
    );
  }

  // Calculate discount percent for product
  const calculateDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return 0;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Render category products
  return (
    <section className={styles.category}>
      <div className={styles.container}>
        <h2>{currentCategory?.title || "Products"}</h2>

        {productsByCategory.length > 0 ? (
          <ul>
            {productsByCategory.map(
              ({ id, image, title, discont_price, price }) => {
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
              }
            )}
          </ul>
        ) : (
          <p>No products found in this category</p>
        )}
      </div>
    </section>
  );
};

export default CategoryProduct;
