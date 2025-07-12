import React from "react";
import styles from "./FormAction.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { orderSchema } from "../../utils/orderSchema";
import { requestSendDiscount } from "../../services/api";

const FormAction = () => {
  // Initialize react-hook-form with validation
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
    resolver: yupResolver(orderSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await requestSendDiscount(data);
      alert("Your coupon request has been sent!");
      reset();
    } catch (error) {
      alert("Error sending request: " + (error?.message || "Unknown error"));
      reset();
    }
  };

  // Format phone input and update value via setValue
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

  // Helper component for error message
  const ErrorMsg = ({ msg }) =>
    msg ? <p className={styles.errors}>{msg}</p> : null;

  // Render form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register("name")}
        placeholder="Name"
        className={styles.input}
      />
      <ErrorMsg msg={errors.name?.message} />

      <input
        {...register("phone")}
        onChange={formatPhoneInput}
        placeholder="Phone number"
        className={styles.input}
      />
      <ErrorMsg msg={errors.phone?.message} />

      <input
        {...register("email")}
        placeholder="Email"
        className={styles.input}
      />
      <ErrorMsg msg={errors.email?.message} />

      <button className={styles.button} type="submit">
        Get a discount
      </button>
    </form>
  );
};

export default FormAction;
