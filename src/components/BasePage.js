import React, { useEffect, useState } from "react";
import "./BasePage.css";
import NewOrder from "./NewOrder";
import AlertBox from "./AlertBox";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Services from "./Services";
import Orders from "./Orders";

function BasePage() {
  return (
    <div className="base">
      <Routes>
        <Route path="/" element={<NewOrder />} />
        <Route path="/services" element={<Services />} />
        <Route path="/porosite" element={<Orders />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  );
}

export default BasePage;
