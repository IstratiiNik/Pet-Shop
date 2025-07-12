import React, { useState } from "react";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../redux/selectors";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../../redux/cartSlice";
import OrderForm from "../OrderForm/OrderForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import Modal from "../../ui/Modal/Modal";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.discont_price || item.price) * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Function for opening a modal window
  const handleOrderSuccess = () => {
    setIsModalOpen(true);
    dispatch(clearCart());
  };

  return (
    <section className={styles.cart}>
      <header className={styles.header}>
        <h2>Shopping cart</h2>
        <div className={styles.devider}></div>
        <Link className={styles.link} to={ROUTES.PRODUCTS}>
          Back to the store
        </Link>
      </header>
      {cartItems.length === 0 ? (
        <>
          <p className={styles.empty}>
            Looks like you have no items in your basket currently.
          </p>
          <Link className={styles.button} to={ROUTES.PRODUCTS}>
            Continue Shopping
          </Link>
        </>
      ) : (
        <div className={styles.productsSection}>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <img
                  className={styles.img}
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                />
                <div className={styles.details}>
                  <div className={styles.detailsTitleRow}>
                    <h3 className={styles.detailsTitle}>{item.title}</h3>
                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label="Remove item"
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                  <div className={styles.row}>
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
                    </div>
                    <div className={styles.priceBlock}>
                      <span className={styles.price}>
                        $
                        {Number(item.discont_price ?? item.price ?? 0).toFixed(
                          2
                        )}
                      </span>
                      {item.discont_price && (
                        <span className={styles.oldPrice}>
                          ${Number(item.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Order summary and form */}
          <aside className={styles.rightContainer}>
            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Order details</h3>
              <p className={styles.itemsCount}>
                <span className={styles.itemsCount}>{totalQuantity}</span> items
              </p>
              <div className={styles.totalContainer}>
                <p className={styles.itemsCount}>Total</p>
                <p className={styles.amount}>${totalAmount.toFixed(2)}</p>
              </div>
              <OrderForm onSuccess={handleOrderSuccess} />
            </div>
          </aside>
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2>Congratulations! </h2>
            <p>Your order has been successfully placed on the website.</p>
            <br />
            <p>A manager will contact you shortly to confirm your order.</p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Cart;
