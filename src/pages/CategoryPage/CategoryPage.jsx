import React, { useState, useEffect } from "react";
import styles from "./CategoryPage.module.scss";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import { petInstance } from "../../services/api";
import { calculateDiscountPercent } from "../../utils/discount";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const CategoryPage = () => {
  // Get category id from URL params
  const { id } = useParams();

  // Local state for products, category name, and loading
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  // Filter and sort state
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sort, setSort] = useState("by default");

  // Fetch products for the category from server
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on category change
    setLoading(true);
    petInstance
      .get(`/categories/${id}/`)
      .then(({ data }) => {
        setProducts(data.data || []);
        setCategoryName(data.category?.title || "");
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [id]);

  // Filter and sort products according to user input
  const filteredProducts = products
    .filter((p) => {
      const price = p.discont_price || p.price;
      if (priceFrom && price < Number(priceFrom)) return false;
      if (priceTo && price > Number(priceTo)) return false;
      if (discountedOnly && !p.discont_price) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "by default") return 0;
      if (sort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "price: high-low")
        return (b.discont_price || b.price) - (a.discont_price || a.price);
      if (sort === "price: low-high")
        return (a.discont_price || a.price) - (b.discont_price || b.price);
      return 0;
    });

  // Show loader while loading data
  if (loading) {
    return (
      <div className={styles.loading}>
        <PulseLoader size={15} />
      </div>
    );
  }

  // Show message if no products found after filtering
  if (!filteredProducts.length) {
    return (
      <section className={styles.categoryPage}>
        {/* Breadcrumbs navigation */}
        <Breadcrumbs
          items={[
            { label: "Main page", to: "/" },
            { label: "Categories", to: "/categories" },
            { label: categoryName },
          ]}
        />
        {/* Category title */}
        <h2 className={styles.title}>{categoryName}</h2>
        {/* Filter and sort controls */}
        <ProductsFilter
          priceFrom={priceFrom}
          priceTo={priceTo}
          onPriceFromChange={setPriceFrom}
          onPriceToChange={setPriceTo}
          discountedOnly={discountedOnly}
          onDiscountedChange={setDiscountedOnly}
          sort={sort}
          onSortChange={setSort}
        />
        {/* Empty state */}
        <div className={styles.empty}>No products found in this category.</div>
      </section>
    );
  }

  // Render products grid
  return (
    <section className={styles.categoryPage}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "Categories", to: "/categories" },
          { label: categoryName },
        ]}
      />
      {/* Category title */}
      <h2 className={styles.title}>{categoryName}</h2>
      {/* Filter and sort controls */}
      <ProductsFilter
        priceFrom={priceFrom}
        priceTo={priceTo}
        onPriceFromChange={setPriceFrom}
        onPriceToChange={setPriceTo}
        discountedOnly={discountedOnly}
        onDiscountedChange={setDiscountedOnly}
        sort={sort}
        onSortChange={setSort}
      />
      {/* Products grid */}
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            discountPercent={calculateDiscountPercent(
              product.price,
              product.discont_price
            )}
            discont_price={product.discont_price}
            price={product.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default CategoryPage;
