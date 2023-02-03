import React from "react";
import "./NewOrder.css";
import API_KEY from "../Requests";
import categories from "./categories";
import { instance_services, instance_order } from "../axios";
import { useEffect, useState } from "react";
import { url } from "../axios";
import AlertBox from "./AlertBox";

function NewOrder() {
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
  const [link, setLink] = useState("");
  const [charge, setCharge] = useState();
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const data_service = {
      key: API_KEY,
      action: "services",
    };
    async function fetchData() {
      const request = await instance_services.post(url, data_service);
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

  const handleConfirm = async () => {
    const data_order = {
      key: API_KEY,
      action: "add",
      service: service.service,
      link: link,
      quantity: quantity,
    };
    try {
      const request = await instance_order.post(url, data_order);
      if (request.data.error) {
        setAlert({ error: request.data.error });
      } else if (request.data.order) {
        setAlert({
          success:
            "Porosia tek sherbimi me ID: " +
            request.data.order +
            " u konfirmua!",
        });
        setLink("");
        setQuantity(0);
        setCharge();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <AlertBox alert={alert} setAlert={setAlert} />
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
                    {service.name} - Çmimi: ${service.rate}
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
          <input
            placeholder="Vendos linkun e rrjetit social (psh. https://instagram.com/@username)"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            type="text"
          />
        </div>
        <label>SASIA</label>
        <div className="base__field">
          <input
            placeholder="Vendos sasine e followers/views ose comments."
            onChange={handleCharge}
            type="text"
            name="quantity"
            value={quantity}
          />
        </div>
        <label>
          ÇMIMI
          <div style={{ fontSize: 10 }}>
            {quantity ? `  (cmimi per 1000 -> $${service.rate})` : ``}
          </div>
        </label>
        <div className="base__field">
          <input
            disabled
            type="text"
            value={`$${charge ? Math.round(charge * 100) / 100 : "0"}`}
            onChange={console.log()}
            placeholder={"324"}
          />
        </div>
        <button
          onClick={handleConfirm}
          className="button__submit"
          type="submit"
          style={{ marginTop: "25px" }}
        >
          Konfirmo
        </button>
      </div>
    </div>
  );
}

export default NewOrder;
