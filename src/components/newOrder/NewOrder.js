import React from "react";
import "./NewOrder.css";
import categories from "../utils/categories";
import { useEffect, useState } from "react";
import AlertBox from "../utils/AlertBox";
import { selectServices, setL, setS } from "../../features/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import { setBalance, setOrder } from "../../features/userSlice";
import { instance_order, instance_services, url } from "../../axios";

function NewOrder() {
  const [category, setCategory] = useState("ππΈ Spring Sale πΈπ");
  const [service, setService] = useState({});
  const [quantity, setQuantity] = useState();
  const [link, setLink] = useState("");
  const [charge, setCharge] = useState();
  const [alert, setAlert] = useState({});
  const user = useSelector((state) => state.data.user.user);
  const services = useSelector(selectServices);
  const isLoading = useSelector((state) => state.data.services.isLoading);
  const dispatch = useDispatch();
  const date = new Date();

  useEffect(() => {
    const data_service = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "services",
    };
    async function fetchData() {
      await instance_services
        .post(url, data_service)
        .then((response) => {
          dispatch(setS(response.data));
          dispatch(setL());
        })
        .catch((err) => {
          dispatch(setL());
          console.log(err);
        });
    }
    fetchData();
    let defaultServices = [];
    for (let i = 0; i < services.length; i++) {
      if (services[i].category == category) {
        defaultServices.push(services[i]);
      }
    }
    setService(defaultServices[0]);
  }, [category]);

  const handleChange2 = (e) => {
    services.map((service) => {
      if (service.service === e.target.value) {
        setService(service);
      }
    });
  };

  useEffect(() => {
    const updateCharge = () => {
      setCharge((service.rate / 1000) * quantity);
    };
    updateCharge();
  }, [quantity]);

  const handleChange = (e) => {
    setCategory(e.target.value);
    // setService(services[0]);
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

  const getBalance = async () => {
    let balance = 0;
    if (user.uid) {
      const usersDataRef = doc(db, "usersData", user.uid);
      const userDataSnap = await getDoc(usersDataRef);

      if (userDataSnap.exists()) {
        balance = balance + userDataSnap.data().balance;
      } else {
        // doc.data() will be undefined in this case
        console.log("Loged out !");
      }
    }
    return balance;
  };

  const addOrderDB = async (orderId, serviceId, link, quantity) => {
    await updateDoc(doc(db, "usersData", user.uid), {
      orders: [
        ...orders,
        {
          orderId: orderId,
          serviceId: serviceId,
          quantity: quantity,
          link: link,
          charge: charge,
          timestamp: date.toLocaleString(),
        },
      ],
    });
  };

  const updateStates = async () => {
    if (user.uid) {
      const usersDataRef = doc(db, "usersData", user.uid);
      const userDataSnap = await getDoc(usersDataRef);

      if (userDataSnap.exists()) {
        dispatch(setOrder(userDataSnap.data().orders));
        dispatch(setBalance(userDataSnap.data().balance));
      } else {
        // doc.data() will be undefined in this case
        console.log("Loged out !");
      }
    }
  };

  const updateBalanceDB = async (balanceMinus) => {
    const balance = await getBalance();
    const upadatedBalance = Number(balance) - Number(balanceMinus);
    await updateDoc(doc(db, "usersData", user.uid), {
      balance: upadatedBalance,
    });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const balance = await getBalance();
    const data_order = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "add",
      service: service.service,
      link: link,
      quantity: quantity,
    };
    try {
      if (balance > charge) {
        const request = await instance_order.post(url, data_order);
        if (request.data.error) {
          setAlert({ error: request.data.error });
          // updateStates();
        } else if (request.data.order) {
          updateBalanceDB(charge);
          addOrderDB(request.data.order, service.service, link, quantity);
          setAlert({
            success:
              "Porosia tek sherbimi me ID: " +
              request.data.order +
              " u konfirmua!",
          });
          // addOrderDB(request.data.order, service.service, link, quantity);
          setLink("");
          setQuantity(0);
          setCharge();
        }
      } else {
        setAlert({ error: "Balanca juaj nuk mjafton per kryrjen e porosise!" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Krijo porosi te re</h2>
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
                      {service.name} - Γmimi: ${service.rate}
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
        <form onSubmit={handleConfirm}>
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
            ΓMIMI
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
            className="button__submit"
            type="submit"
            style={{ marginTop: "25px" }}
          >
            Konfirmo
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewOrder;
