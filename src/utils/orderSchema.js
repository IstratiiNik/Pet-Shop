import * as yup from "yup";

export const orderSchema = yup
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
