import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { instance_services, url } from "./axios";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import { NavBar } from "./components/navigator/Navigator";
import { setL, setS } from "./features/servicesSlice";
import {
  loginUser,
  setBalance,
  setLoading,
  setOrder,
  setPayment,
} from "./features/userSlice";
import db, { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data_service = {
      key: process.env.REACT_APP_SMMPANEL_API,
      action: "services",
    };

    async function fetchData() {
      await instance_services
        .post("/", data_service)
        .then((response) => {
          dispatch(setS(response.data));
          // let cats = [];
          // for (let i = 0; i < response.data.length; i++) {
          //   cats.push(response.data[i].category);
          // }
          // console.log(cats);
          // dispatch(setC(cats));
          dispatch(setL());
        })
        .catch((err) => {
          dispatch(setL());
          console.log(err);
        });
    }

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading());
      } else {
        console.log("Loged out");
        dispatch(setLoading());
      }
    });

    return unsubscribe;
  }, []);

  const user = useSelector((state) => state.data.user.user);
  const isLoading = useSelector((state) => state.data.user.isLoading);

  const getData = async () => {
    if (user.uid) {
      const usersDataRef = doc(db, "usersData", user.uid);
      const userDataSnap = await getDoc(usersDataRef);

      if (userDataSnap.exists()) {
        dispatch(setBalance(userDataSnap.data().balance));
        dispatch(setOrder(userDataSnap.data().orders));
        dispatch(setPayment(userDataSnap.data().payments));
      } else {
        // doc.data() will be undefined in this case
        console.log("Loged out !");
      }
    }
  };

  if (auth.currentUser) {
    getData();
  }

  return (
    <div className="app">
      <Router>
        {isLoading ? (
          <span class="loader"></span>
        ) : (
          <>
            <NavBar />
            <div className={` ${user ? "app__login" : "app__logout"}`}>
              {user ? <Dashboard /> : <HomePage />}
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
