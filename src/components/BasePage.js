import React, { useEffect, useState } from "react";
import "./BasePage.css";
import NewOrder from "./newOrder/NewOrder";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Services from "./allServices/Services";
import AddBalance from "./payments/AddBalance";
import Orders from "./userOrders/Orders";

function BasePage() {
  return (
    <div className="base">
      <Routes>
        <Route path="/" element={<NewOrder />} />
        <Route path="/services" element={<Services />} />
        <Route path="/porosite" element={<Orders />} />
        <Route path="/shto_balance" element={<AddBalance />} />
      </Routes>
    </div>
  );
}

export default BasePage;
