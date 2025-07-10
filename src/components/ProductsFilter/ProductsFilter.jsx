import React from "react";
import styles from "./ProductsFilter.module.scss";

const ProductsFilter = ({
  priceFrom,
  priceTo,
  onPriceFromChange,
  onPriceToChange,
  discountedOnly,
  onDiscountedChange,
  sort,
  onSortChange,
  showDiscountedCheckbox,
}) => (
  <form className={styles.filter}>
    {/* Price range filter */}
    <label className={styles.label}>
      Price
      <input
        type="number"
        placeholder="from"
        value={priceFrom}
        onChange={(e) => onPriceFromChange(e.target.value)}
        className={styles.input}
        min={0}
      />
      <input
        type="number"
        placeholder="to"
        value={priceTo}
        onChange={(e) => onPriceToChange(e.target.value)}
        className={styles.input}
        min={0}
      />
    </label>
    {/* Discounted items checkbox */}
    {showDiscountedCheckbox !== false && (
      <label className={styles.labelCheckbox}>
        Discounted items
        <input
          type="checkbox"
          checked={discountedOnly}
          onChange={(e) => onDiscountedChange(e.target.checked)}
        />
      </label>
    )}
    {/* Sorting select */}
    <label className={styles.label}>
      Sorted
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.select}
      >
        <option value="by default">by default</option>
        <option value="newest">newest</option>
        <option value="price: high-low">price: high-low</option>
        <option value="price: low-high">price: low-high</option>
      </select>
    </label>
  </form>
);

export default ProductsFilter;
