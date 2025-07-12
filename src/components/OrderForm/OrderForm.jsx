import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.scss";
import { requestSendOrder } from "../../services/api";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/selectors";

// Validation schema
const schema = yup
  .object({
    name: yup
      .string()
      .min(2, "Name must contain at least 2 characters")
      .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'\s-]+$/, "Name can only contain letters")
      .required("Name is required"),
    phone: yup
      .string()
      .test("phone-format", "Invalid phone format", (value) => {
        // Germany: +49XXXXXXXXX
        const deRegex = /^\+49\d{9,12}$/;
        return deRegex.test(value);
      })
      .required("Phone number is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  })
  .required();

const OrderForm = ({ onSubmit: onOrderSubmit, onSuccess }) => {
  // Get cart items from Redux store
  const cartItems = useSelector(selectCartItems);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  // Phone input formatting
  const formatPhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && !value.startsWith("+")) {
      if (value.startsWith("49")) {
        value = `+${value}`;
      }
    }
    if (value.startsWith("+49") && value.length > 14)
      value = value.slice(0, 14);
    setValue("phone", value);
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      // Prepare order data
      const orderData = {
        customer: data,
        items: cartItems,
      };

      // Send order to backend
      await requestSendOrder(orderData);

      // Call external submit handler if provided
      if (onOrderSubmit) {
        await onOrderSubmit(orderData);
      }

      // Show modal on success
      if (onSuccess) {
        onSuccess();
      }

      // Reset form after success
      reset();
    } catch (error) {
      // Show error alert and reset form
      alert("Error submitting order: " + (error?.message || "Unknown error"));
      reset();
    }
  };

  // Render form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Name input */}
      <input
        {...register("name")}
        placeholder="Name"
        className={styles.input}
      />
      {errors.name?.message && (
        <p className={styles.errors}>{errors.name.message}</p>
      )}

      {/* Phone input */}
      <input
        {...register("phone")}
        onChange={formatPhoneInput}
        placeholder="Phone number"
        className={styles.input}
      />
      {errors.phone?.message && (
        <p className={styles.errors}>{errors.phone.message}</p>
      )}

      {/* Email input */}
      <input
        {...register("email")}
        placeholder="Email"
        className={styles.input}
      />
      {errors.email?.message && (
        <p className={styles.errors}>{errors.email.message}</p>
      )}

      {/* Submit button */}
      <button className={styles.button} type="submit">
        Order
      </button>
    </form>
  );
};

export default OrderForm;
