import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/selectors";
import { fetchProductsAll } from "../../redux/petSlice";
import { calculateDiscountPercent } from "../../utils/discount";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./AllProductsPage.module.scss";
import { PulseLoader } from "react-spinners";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";

const AllProductsPage = () => {
  // Get products from Redux store
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchProductsAll());
  }, [dispatch]);

  // Filter and sort state
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sort, setSort] = useState("by default");

  // Filter and sort products
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

  // Render all products list with filter and breadcrumbs
  return (
    <section className={styles.products}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs
        items={[{ label: "Main page", to: "/" }, { label: "All products" }]}
      />
      {/* Page title */}
      <h2 className={styles.title}>All products</h2>
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
      {/* Products list */}
      <ul className={styles.list}>
        {filteredProducts.map(({ id, title, image, discont_price, price }) => {
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
