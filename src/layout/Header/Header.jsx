import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartImg from "../../assets/header/cart-empty.svg";
import Logo from "../../assets/header/pet-logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get cart items count from Redux
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img className={styles.logoImg} src={Logo} alt="Logo" />
          </NavLink>
        </div>

        {/* Burger button */}
        <button
          className={styles.burger}
          onClick={handleMenuToggle}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation links */}
        <div
          className={`${styles.links} ${menuOpen ? styles.open : ""}`}
          onClick={handleLinkClick}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Main Page
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            All products
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            All sales
          </NavLink>
        </div>
        <div className={styles.cart}>
          <NavLink to="/cart" className={styles.cartLink}>
            <img className={styles.cartImg} src={CartImg} alt="Cart" />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
