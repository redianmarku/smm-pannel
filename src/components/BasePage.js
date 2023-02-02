import React, { useEffect, useState } from "react";
import "./BasePage.css";
import instance from "../axios";
import API_KEY from "../Requests";
import categories from "./categories";

const url = "https://smmpanel.net/api/v2";

function BasePage() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("❄️🎿 Winter Sale 🎿 ❄️");
  const [service, setService] = useState({
    service: "2254",
    name: "🎿 Instagram Followers [500K] ⚡️ ♻️",
    type: "Default",
    rate: "0.51",
    min: "100",
    max: "500000",
    dripfeed: false,
    refill: false,
    cancel: false,
    category: "❄️🎿 Winter Sale 🎿 ❄️",
  });
  const [quantity, setQuantity] = useState();
  const [link, setLink] = useState();
  const [charge, setCharge] = useState();

  useEffect(() => {
    async function fetchData() {
      const request = await instance.post(url, API_KEY);
      setServices(request.data);
    }

    fetchData();
  }, [category]);

  useEffect(() => {
    const updateCharge = () => {
      setCharge((service.rate / 1000) * quantity);
    };
    updateCharge();
  }, [quantity]);

  // useEffect(() => {
  //   console.log(JSON.stringify(service));
  // }, [service]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleChange2 = (e) => {
    services.map((service) => {
      if (service.service == e.target.value) {
        setService(service);
      }
    });
  };

  const handleCharge = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="base">
      <div className="base__category">
        <label htmlFor="">KATEGORIA</label>
        <div className="category__selector">
          <select name="" id="" onChange={handleChange}>
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="">SHERBIMI</label>
        <div className="category__selector">
          <select name="" id="" onChange={handleChange2}>
            {services.map((service) => {
              if (service.category == category) {
                return (
                  <option key={service.name} value={service.service}>
                    {service.name} Cmimi: ${service.rate}
                  </option>
                );
              }
            })}
            ;
          </select>
        </div>
      </div>
      <div className="base__fields">
        <label htmlFor="">LINKU</label>
        <div className="base__field">
          <input type="text" />
        </div>
        <label>SASIA</label>
        <div className="base__field">
          <input
            onChange={handleCharge}
            type="text"
            name="quantity"
            value={quantity}
          />
        </div>
        <label>ÇMIMI</label>
        <div className="base__field">
          <input
            disabled
            type="text"
            value={`$${Math.round(charge * 100) / 100}`}
            onChange={console.log()}
          />
        </div>
      </div>

      {/* <table border={1}>
        <tr>
          <th>Service</th>
          <th>Type</th>
          <th>Name</th>
          <th>Rate</th>
          <th>Min</th>
          <th>Max</th>
          <th>Dripfeed</th>
          <th>Refill</th>
          <th>Cancel</th>
          <th>Category</th>
        </tr>
        {services.map((service) => {
          if (service.category == category) {
            return (
              <tr>
                <td>{service.service}</td>
                <td>{service.type}</td>
                <td>{service.name}</td>
                <td>{service.rate}</td>
                <td>{service.min}</td>
                <td>{service.max}</td>
                <td>{service.dripfeed}</td>
                <td>{service.refill}</td>
                <td>{service.cancel}</td>
                <td>{service.category}</td>
              </tr>
            );
          }
        })}
      </table> */}
    </div>
  );
}

export default BasePage;
