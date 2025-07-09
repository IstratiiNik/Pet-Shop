import React from "react";
import styles from "./FormAction.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// Validation schema using yup
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

const FormAction = () => {
  // Initialize react-hook-form with validation
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

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
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
