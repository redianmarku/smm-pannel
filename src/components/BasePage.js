import React, { useEffect, useState } from "react";
import "./BasePage.css";
import instance from "../axios";
const qs = require("qs");

const url = "https://smmpanel.net/api/v2";

function BasePage() {
  const [services, setServices] = useState([]);

  useEffect(() => {}, []);

  async function fetchData() {
    //   const request = await axios.post(url, {
    //     key: "1894c68c3f951174844748767f8e32ea",
    //     action: "services",
    //   });
    try {
      const { data } = await instance.post(url);
      console.log(data);
    } catch (e) {
      console.log(e.response.data);
    }
    // console.log("----------->" + request.data);
  }

  fetchData();

  return (
    <div className="base">
      <h1>BasePage</h1>
      <table border={1}>
        <tr>
          <td>Service</td>
          <td>Type</td>
          <td>Name</td>
          <td>Rate</td>
          <td>Min</td>
          <td>Max</td>
          <td>Dripfeed</td>
          <td>Refill</td>
          <td>Cancel</td>
          <td>Category</td>
        </tr>
      </table>
    </div>
  );
}

export default BasePage;
