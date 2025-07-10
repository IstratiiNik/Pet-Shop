import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.scss";

// Схема валидации (можете доработать под свои требования)
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

const OrderForm = ({ onSubmit: onOrderSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  // Форматирование телефона
  const formatPhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0 && !value.startsWith("+")) {
      if (value.startsWith("49")) {
        value = `+${value}`;
      }
    }
    if (value.startsWith("+49") && value.length > 14) value = value.slice(0, 14);
    setValue("phone", value);
  };

  // Обработка отправки формы
  const onSubmit = (data) => {
    if (onOrderSubmit) {
      onOrderSubmit(data);
    } else {
      // По умолчанию просто выводим в консоль
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register("name")}
        placeholder="Name"
        className={styles.input}
      />
      {errors.name?.message && (
        <p className={styles.errors}>{errors.name.message}</p>
      )}
      <input
        {...register("phone")}
        onChange={formatPhoneInput}
        placeholder="Phone number"
        className={styles.input}
      />
      {errors.phone?.message && (
        <p className={styles.errors}>{errors.phone.message}</p>
      )}
      <input
        {...register("email")}
        placeholder="Email"
        className={styles.input}
      />
      {errors.email?.message && (
        <p className={styles.errors}>{errors.email.message}</p>
      )}
      <button className={styles.button} type="submit">
        Order
      </button>
    </form>
  );
};

export default OrderForm;