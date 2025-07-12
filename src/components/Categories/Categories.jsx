import React, { useEffect } from "react";
import styles from "./Categories.module.scss";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../redux/selectors";
import { fetchCategoriesAll } from "../../redux/petSlice";
import { PulseLoader } from "react-spinners";

const Categories = () => {
  // Get Redux state and router info
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) || [];
  const isLoading = useSelector(selectCategoriesLoading);
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.MAIN;

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

  // Show only 4 categories on home page, all otherwise
  const displayedCategories = isHomePage ? categories.slice(0, 4) : categories;

  // Render categories list
  return (
    <section className={styles.categories}>
      <header className={styles.header}>
        <h2>Categories</h2>
        <div className={styles.divider}></div>
        <Link className={styles.link} to={ROUTES.CATEGORIES}>
          All categories
        </Link>
      </header>
      <ul className={styles.list}>
        {displayedCategories.map((category) => (
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

export default Categories;
