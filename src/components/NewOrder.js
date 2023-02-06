import React from "react";
import "./NewOrder.css";
import API_KEY from "../Requests";
import categories from "./categories";
import { instance_order } from "../axios";
import { useEffect, useState } from "react";
import { url } from "../axios";
import AlertBox from "./AlertBox";
import { selectServices } from "../features/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { setOrder } from "../features/userSlice";

function NewOrder() {
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
  const user = useSelector((state) => state.data.user.user);
  const services = useSelector(selectServices);
  const isLoading = useSelector((state) => state.data.services.isLoading);
  const dispatch = useDispatch();
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
      if (service.service === e.target.value) {
        setService(service);
      }
    });
  };

  const handleCharge = (e) => {
    setQuantity(e.target.value);
  };

  // const getOrders = async () => {
  //   const orders = null;
  //   if (user.uid) {
  //     const usersDataRef = doc(db, "usersData", user.uid);
  //     const userDataSnap = await getDoc(usersDataRef);

  //     orders = userDataSnap.exists().orders;
  //   }
  //   return orders;
  // };

  // console.log(getOrders);
  const orders = useSelector((state) => state.data.user.orders);
  const balance = useSelector((state) => state.data.user.balance);
  const addOrderDB = async (serviceId, link, quantity) => {
    await setDoc(doc(db, "usersData", user.uid), {
      balance: balance,
      orders: [
        ...orders,
        { serviceId: serviceId, quantity: quantity, link: link },
      ],
    });
  };

  const updateOrdersInState = async () => {
    if (user.uid) {
      const usersDataRef = doc(db, "usersData", user.uid);
      const userDataSnap = await getDoc(usersDataRef);

      if (userDataSnap.exists()) {
        dispatch(setOrder(userDataSnap.data().orders));
      } else {
        // doc.data() will be undefined in this case
        console.log("Loged out !");
      }
    }
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
        addOrderDB(service.service, link, quantity);
        //setAlert({ error: request.data.error });
        updateOrdersInState();
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
            {isLoading ? (
              <option>Duke ngarkuar...</option>
            ) : (
              services.map((service) => {
                if (service.category == category) {
                  return (
                    <option key={service.name} value={service.service}>
                      {service.name} - Çmimi: ${service.rate}
                    </option>
                  );
                }
              })
            )}
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
