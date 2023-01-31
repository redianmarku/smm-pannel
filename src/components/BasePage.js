import React, { useEffect, useState } from "react";
import "./BasePage.css";
import instance from "../axios";
import API_KEY from "../Requests";
import categories from "./categories";

const url = "https://smmpanel.net/api/v2";

function BasePage() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [service, setService] = useState();
  const [quantity, setQuantity] = useState();
  const [link, setLink] = useState();
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.post(url, API_KEY);
      setServices(request.data);
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleChange2 = (e) => {
    setService(e.target.value);
  };
  console.log(service.name);
  const handleCharge = (e) => {
    setCharge(quantity * service.rate);
  };

  return (
    <div className="base">
      <h1>BasePage</h1>
      <div className="base__category">
        <div className="category__selector">
          <label htmlFor="">Zgjidh kategorine:</label>
          <select name="" id="" onChange={handleChange}>
            {categories.map((categorie) => (
              <option value={categorie}>{categorie}</option>
            ))}
          </select>
        </div>
        <div className="category__selector">
          <label htmlFor="">Zgjidh sherbimin:</label>
          <select name="" id="" onChange={handleChange2}>
            {services.map((service) => {
              if (service.category == category) {
                return <option value={service}>{service.name}</option>;
              }
            })}
            ;
          </select>
        </div>
      </div>
      <div className="base__fields">
        <div className="base__field">
          <label htmlFor="">Link:</label>
          <input type="text" />
        </div>

        <div className="base__field">
          <label htmlFor="">Quantity:</label>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="text"
            name="quantity"
            value={quantity}
          />
        </div>

        <div className="base__field">
          <label htmlFor="">Charge:</label>
          <input type="text" value={charge} onChange={handleCharge} />
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
