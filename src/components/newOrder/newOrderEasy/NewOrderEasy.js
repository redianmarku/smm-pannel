import React from "react";
import "./NewOrderEasy.css";
import OrderCard from "./OrderCard";

function NewOrderEasy({
  link,
  setLink,
  quantity,
  setQuantity,
  charge,
  setCharge,
  handleConfirm,
  handleCharge,
}) {
  return (
    <div className="NOEasy">
      <OrderCard
        link={link}
        setLink={setLink}
        quantity={quantity}
        setQuantity={setQuantity}
        charge={charge}
        setCharge={setCharge}
        handleConfirm={handleConfirm}
        handleCharge={handleCharge}
      />
    </div>
  );
}

export default NewOrderEasy;
