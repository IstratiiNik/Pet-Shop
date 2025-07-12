import axios from "axios";

export const sendOrderRequest = (orderData) => {
  return axios.post("http://localhost:3333/order/send", orderData);
};