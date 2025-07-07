import React from "react";
import { NavLink } from "react-router-dom";
import CartImg from "../../assets/header/cart-empty.svg";
import Logo from "../../assets/header/pet-logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.logo}>
          <NavLink to="/">
            <img className={styles.logoImg} src={Logo} alt="Logo" />
          </NavLink>
        </div>

        <div className={styles.links}>
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
          <NavLink to="/cart">
            <img className={styles.cartImg} src={CartImg} alt="Cart" />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Header;
