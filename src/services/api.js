import axios from "axios";

// Create axios instance for API requests
export const petInstance = axios.create({
  baseURL: "http://localhost:3333",
});

// Get all categories
export const requestCategoryAll = async () => {
  const { data } = await petInstance.get("/categories/all");
  return data;
};

// Get category by ID
export const requestCategoryById = async (categoryId) => {
  const { data } = await petInstance.get(`/categories/${categoryId}`);
  return data;
};

// Get all products
export const requestProductsAll = async () => {
  const { data } = await petInstance.get("/products/all");
  return data;
};

// Get product by ID
export const requestProductById = async (productId) => {
  const { data } = await petInstance.get(`/products/${productId}`);
  return data;
};

// Send order
export const requestSendOrder = async (orderData) => {
  const { data } = await petInstance.post("/order/send", orderData);
  return data;
};

// Send discount coupon request
export const requestSendDiscount = async (formData) => {
  const { data } = await petInstance.post("/sale/send", formData);
  return data;
};
