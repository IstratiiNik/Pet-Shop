import React, { useEffect, useState } from "react";
import styles from "./AllSalesPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/selectors";
import { fetchProductsAll } from "../../redux/petSlice";
import { calculateDiscountPercent } from "../../utils/discount";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";

const AllSalesPage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);

  // Filter only products with a discount
  const saleProducts = allProducts.filter(
    (product) => product.discont_price !== null
  );

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchProductsAll());
  }, [dispatch]);

  // Filter and sort state
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sort, setSort] = useState("by default");

  // Filter and sort products
  const filteredProducts = saleProducts
    .filter((p) => {
      const price = p.discont_price || p.price;
      if (priceFrom && price < Number(priceFrom)) return false;
      if (priceTo && price > Number(priceTo)) return false;
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

  return (
    <section className={styles.sale}>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs
        items={[{ label: "Main page", to: "/" }, { label: "All sales" }]}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h2>Discounted items</h2>
      </header>

      {/* Filter and sort controls */}
      <ProductsFilter
        priceFrom={priceFrom}
        priceTo={priceTo}
        onPriceFromChange={setPriceFrom}
        onPriceToChange={setPriceTo}
        sort={sort}
        onSortChange={setSort}
        showDiscountedCheckbox={false}
      />

      {/* Products grid */}
      <ul className={styles.list}>
        {filteredProducts.map(({ id, image, title, discont_price, price }) => {
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
