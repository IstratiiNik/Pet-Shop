import React, { useEffect } from "react";
import styles from "../../components/Categories/Categories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../redux/selectors";
import { fetchCategoriesAll } from "../../redux/petSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { PulseLoader } from "react-spinners";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const CategoriesPage = () => {
  // Get categories from Redux store
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) || [];
  const isLoading = useSelector(selectCategoriesLoading);

  // Fetch all categories on mount
  useEffect(() => {
    dispatch(fetchCategoriesAll());
  }, [dispatch]);

  // Show loader while fetching categories
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <PulseLoader color="#36d7b7" size={15} margin={2} />
      </div>
    );
  }

  // Render categories list
  return (
    <section className={styles.categories}>
      <Breadcrumbs
        items={[{ label: "Main page", to: "/" }, { label: "Categories" }]}
      />
      <header className={styles.header}>
        <h2>All categories</h2>
      </header>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <Link
              className={styles.categoryLink}
              to={`${ROUTES.CATEGORIES}/${category.id}`}
            >
              <img
                className={styles.image}
                src={`http://localhost:3333${category.image}`}
                alt={category.title}
              />
              <h3>{category.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesPage;
