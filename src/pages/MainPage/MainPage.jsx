import React from "react";
import MainTitle from "../../components/MainTitle/MainTitle";
import Categories from "../../components/Categories/Categories";
import DiscountForm from "../../components/DiscountForm/DiscountForm";
import Sale from "../../components/Sale/Sale";

const Main = () => {
  return (
    <>
      <MainTitle />
      <Categories />
      <DiscountForm />
      <Sale />
    </>
  );
};

export default Main;
