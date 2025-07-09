import React from "react";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../redux/selectors";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../../redux/cartSlice";

const Cart = () => {
  // Get cart items from Redux store
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // Calculate total price for the cart
  const total = cartItems.reduce(
    (sum, item) => sum + (item.discont_price || item.price) * item.quantity,
    0
  );

  // Render cart items and summary
  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Shopping cart</h2>
      {/* If cart is empty, show message */}
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        // Render list of cart items
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {/* Product image */}
              <img
                className={styles.img}
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
              />
              <div className={styles.info}>
                {/* Product title */}
                <h3 className={styles.name}>{item.title}</h3>
                {/* Price and total for this item */}
                <div className={styles.priceBlock}>
                  <span className={styles.price}>
                    ${Number(item.discont_price ?? item.price ?? 0).toFixed(2)}
                  </span>
                  <span className={styles.total}>
                    Total: $
                    {Number(
                      (item.discont_price ?? item.price ?? 0) * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
                {/* Quantity controls */}
                <div className={styles.qtyBlock}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => dispatch(decrementQty(item.id))}
                  >
                    -
                  </button>
                  <span className={styles.qty}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => dispatch(incrementQty(item.id))}
                  >
                    +
                  </button>
                  {/* Remove item from cart */}
                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Cart summary */}
      {cartItems.length > 0 && (
        <div className={styles.summary}>
          <span>Total: ${total.toFixed(2)}</span>
        </div>
      )}
    </section>
  );
};

export default Cart;
