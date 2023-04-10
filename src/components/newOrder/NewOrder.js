import React, { useRef } from "react";
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
import NewOrderEasy from "./newOrderEasy/NewOrderEasy";
import { Favorite, PeopleAlt } from "@material-ui/icons";
import { cmimi } from "../../cmimi";

function NewOrder() {
  const [category, setCategory] = useState("🍃🌸 Spring Sale 🌸🍃");
  const [service, setService] = useState({});
  const [quantity, setQuantity] = useState();
  const [link, setLink] = useState("");
  const [charge, setCharge] = useState();
  const [alert, setAlert] = useState({});
  // ----- easy------
  const [Iselector, setISelector] = useState("");
  const [Tselector, setTSelector] = useState("");
  const [eCharge, setECharge] = useState();
  const [TCharge, setTCharge] = useState();

  // ----------------

  const user = useSelector((state) => state.data.user.user);
  const services = useSelector(selectServices);
  const isLoading = useSelector((state) => state.data.services.isLoading);
  const dispatch = useDispatch();
  const date = new Date();
  const advMode = useSelector((state) => state.data.utils.advancedMode);

  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [alertRef]);

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
      setCharge(((parseFloat(service.rate) + cmimi) / 1000) * quantity);
      let Irate = 0;
      if (Iselector == "followers") {
        Irate = 0.41 + cmimi;
      } else {
        Irate = 0.13 + cmimi;
      }

      let Trate = 0;
      if (Tselector == "followers") {
        Trate = 2.24 + cmimi;
      } else {
        Trate = 0.4 + cmimi;
      }
      setTCharge((Trate / 1000) * quantity);
      setECharge((Irate / 1000) * quantity);
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

  const handleIGConfirm = async (e) => {
    e.preventDefault();
    const balance = await getBalance();
    const data_orderF = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "add",
      service: "3254",
      link: link,
      quantity: quantity,
    };

    const data_orderL = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "add",
      service: "172",
      link: link,
      quantity: quantity,
    };

    try {
      if (balance > eCharge) {
        let data_order = data_orderF;

        if (Iselector === "followers") {
          data_order = data_orderF;
        } else if (Iselector === "likes") {
          data_order = data_orderL;
        }

        const request = await instance_order.post(url, data_order);
        if (request.data.error) {
          setAlert({ error: request.data.error });
          // updateStates();
        } else if (request.data.order) {
          updateBalanceDB(eCharge);
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
          setECharge();
        }
      } else {
        setAlert({ error: "Balanca juaj nuk mjafton per kryrjen e porosise!" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTTConfirm = async (e) => {
    e.preventDefault();
    const balance = await getBalance();
    const data_orderF = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "add",
      service: "2528",
      link: link,
      quantity: quantity,
    };

    const data_orderL = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "add",
      service: "3052",
      link: link,
      quantity: quantity,
    };

    try {
      if (balance > TCharge) {
        let data_order = data_orderF;

        if (Tselector === "followers") {
          data_order = data_orderF;
        } else if (Tselector === "likes") {
          data_order = data_orderL;
        }

        const request = await instance_order.post(url, data_order);
        if (request.data.error) {
          setAlert({ error: request.data.error });
          // updateStates();
        } else if (request.data.order) {
          updateBalanceDB(TCharge);
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
          setTCharge();
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
      <div ref={alertRef}>
        <AlertBox alert={alert} setAlert={setAlert} />
      </div>

      {advMode ? (
        <div className="ADV_MODE">
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
                          {service.name} - Çmimi: $
                          {parseFloat(service.rate) + cmimi}
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
                ÇMIMI
                <div style={{ fontSize: 10 }}>
                  {quantity
                    ? `  (Çmimi per 1000 -> $${
                        parseFloat(service.rate) + cmimi
                      })`
                    : ``}
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
      ) : (
        // Order Easyy ----------------------------------------------------------------------
        <>
          <div className="easyOrders">
            <div className="easyOrder">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                alt="IG-LOGo"
                className="easyOrder__logo"
              />
              <div className="easyOrder__title">Instagram Service</div>
              <div className="easyOrder__selector">
                <div
                  className="easyOrder__select"
                  onClick={() => setISelector("followers")}
                >
                  <PeopleAlt
                    style={{ fontSize: "130px" }}
                    className={`selectorIcon ${
                      Iselector === "followers" ? "selectorIcon__selected" : ""
                    }`}
                  />
                  <span>Instagram Followers</span>
                </div>
                <div
                  className="easyOrder__select"
                  onClick={() => setISelector("likes")}
                >
                  <Favorite
                    style={{ fontSize: "130px" }}
                    className={`selectorIcon ${
                      Iselector === "likes" ? "selectorIcon__selected" : ""
                    }`}
                  />
                  <span>Instagram Likes</span>
                </div>
              </div>

              {Iselector === "" ? (
                ""
              ) : (
                <div className="easyOrder__form">
                  <form onSubmit={handleIGConfirm}>
                    <label htmlFor="">
                      LINKU
                      <div style={{ fontSize: 10 }}>
                        {Iselector === "followers" ? (
                          <>
                            Vendos linkun e profilit te IG (psh.
                            https://www.instagram.com/username)
                          </>
                        ) : (
                          <>
                            Vendos linkun e postit te IG (psh.
                            https://www.instagram.com/p/XxxXxxxX/)
                          </>
                        )}
                      </div>
                    </label>

                    <div className="base__field">
                      <input
                        className="input__easy"
                        placeholder={
                          Iselector === "followers"
                            ? "Vendos linkun e profilit"
                            : "Vendos linkun e postimit"
                        }
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
                        className="input__easy"
                        placeholder={
                          Iselector === "followers"
                            ? "Vendos sasine e followers"
                            : "Vendos sasine e likes"
                        }
                        onChange={handleCharge}
                        type="text"
                        name="quantity"
                        value={quantity}
                      />
                    </div>
                    <label>
                      ÇMIMI
                      <div style={{ fontSize: 10 }}>
                        {quantity
                          ? `  (Çmimi per 1000 -> $${
                              Iselector === "followers"
                                ? parseFloat("0.41") + cmimi
                                : parseFloat("0.13") + cmimi
                            })`
                          : ``}
                      </div>
                    </label>
                    <div className="base__field">
                      <input
                        className="input__easy"
                        disabled
                        type="text"
                        value={`$${
                          eCharge ? Math.round(eCharge * 100) / 100 : "0"
                        }`}
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
              )}
            </div>
            {/* Tiktokkk */}
            <div className="easyOrder">
              <img
                src="https://www.edigitalagency.com.au/wp-content/uploads/TikTok-icon-glyph.png"
                alt="IG-LOGo"
                className="easyOrder__logo"
              />
              <div className="easyOrder__title">Tiktok Services</div>
              <div className="easyOrder__selector">
                <div
                  className="easyOrder__select"
                  onClick={() => setTSelector("followers")}
                >
                  <PeopleAlt
                    style={{ fontSize: "130px" }}
                    className={`selectorIcon ${
                      Tselector === "followers" ? "selectorIcon__selected" : ""
                    }`}
                  />
                  <span>Tiktok Followers</span>
                </div>
                <div
                  className="easyOrder__select"
                  onClick={() => setTSelector("likes")}
                >
                  <Favorite
                    style={{ fontSize: "130px" }}
                    className={`selectorIcon ${
                      Tselector === "likes" ? "selectorIcon__selected" : ""
                    }`}
                  />
                  <span>Tiktok Likes</span>
                </div>
              </div>

              {Tselector === "" ? (
                ""
              ) : (
                <div className="easyOrder__form">
                  <form onSubmit={handleTTConfirm}>
                    <label htmlFor="">
                      LINKU
                      <div style={{ fontSize: 10 }}>
                        {Tselector === "followers" ? (
                          <>
                            Vendos linkun e profilit te Tiktok (psh.
                            https://www.tiktok.com/@username)
                          </>
                        ) : (
                          <>
                            Vendos linkun e postit (psh.
                            https://www.tiktok.com/@username/video/00000)
                          </>
                        )}
                      </div>
                    </label>

                    <div className="base__field">
                      <input
                        className="input__easy"
                        placeholder={
                          Tselector === "followers"
                            ? "Vendos linkun e profilit"
                            : "Vendos linkun e postimit"
                        }
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
                        className="input__easy"
                        placeholder={
                          Tselector === "followers"
                            ? "Vendos sasine e followers"
                            : "Vendos sasine e likes"
                        }
                        onChange={handleCharge}
                        type="text"
                        name="quantity"
                        value={quantity}
                      />
                    </div>
                    <label>
                      ÇMIMI
                      <div style={{ fontSize: 10 }}>
                        {quantity
                          ? `  (Çmimi per 1000 -> $${
                              Tselector === "followers"
                                ? parseFloat("2.24") + cmimi
                                : parseFloat("0.40") + cmimi
                            })`
                          : ``}
                      </div>
                    </label>
                    <div className="base__field">
                      <input
                        className="input__easy"
                        disabled
                        type="text"
                        value={`$${
                          TCharge ? Math.round(TCharge * 100) / 100 : "0"
                        }`}
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
              )}
            </div>
          </div>
          <br></br> <br></br> <br></br>
          <br></br> <br></br>
        </>

        // ----------------------------------------------------------------------------------
      )}
    </div>
  );
}

export default NewOrder;
