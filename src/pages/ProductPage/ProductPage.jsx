import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { petInstance } from "../../services/api";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const ProductPage = () => {
  // Get product id from URL
  const { id } = useParams();
  const dispatch = useDispatch();

  // Local state for product data, loading, quantity, and active image
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [error, setError] = useState(null);

  // Fetch product data on mount or when id changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const { data } = await petInstance.get(`/products/${id}`);
        setProduct(Array.isArray(data) ? data[0] : data);
        setError(null);
      } catch {
        setError("Error fetching product.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add product to cart with selected quantity
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: qty }));
    }
  };

  // Show loading or error state
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  } else if (error) {
    return <div className={styles.error}>{error}</div>;
  } else if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

  // Prepare images array for gallery
  const images =
    product?.images && product.images.length ? product.images : [product.image];

  return (
    <section className={styles.productPage}>
      <Breadcrumbs
        items={[
          { label: "Main page", to: "/" },
          { label: "Categories", to: "/categories" },
          {
            label: product?.categoryName || "Category",
            to: `/categories/${product?.categoryId}`,
          },
          { label: product?.title },
        ]}
      />
      <div className={styles.breadcrumbs}></div>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3333${img}`}
                alt=""
                className={`${styles.thumb} ${
                  activeImg === idx ? styles.active : ""
                }`}
                onClick={() => setActiveImg(idx)}
              />
            ))}
          </div>
          <div className={styles.mainImage}>
            <img
              src={`http://localhost:3333${images[activeImg]}`}
              alt={product.title}
            />
          </div>
        </div>
        {/* Product info block */}
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <div className={styles.priceRow}>
            <span className={styles.discounted}>
              ${product.discont_price || product.price}
            </span>
            {product.discont_price && (
              <>
                <span className={styles.original}>${product.price}</span>
                <span className={styles.discountBadge}>
                  -
                  {Math.round(
                    100 - (product.discont_price / product.price) * 100
                  )}
                  %
                </span>
              </>
            )}
          </div>
          {/* Quantity and add to cart controls */}
          <div className={styles.cartRow}>
            <div className={styles.qtyBlock}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                -
              </button>
              <span className={styles.qty}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>
            <button className={styles.addButton} onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
          {/* Product description */}
          <div className={styles.descriptionBlock}>
            <div className={styles.descTitle}>Description</div>
            <div className={styles.description}>{product.description}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
