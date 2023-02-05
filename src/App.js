import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { instance_services, url } from "./axios";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import { NavBar } from "./components/Navigator";
import { setL, setS } from "./features/servicesSlice";
import { loginUser, setOrder } from "./features/userSlice";
import { auth } from "./firebase";
import API_KEY from "./Requests";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data_service = {
      key: API_KEY,
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
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        console.log("Loged out");
      }
    });
  }, []);

  const user = useSelector((state) => state.data.user.user);

  return (
    <div className="app">
      <Router>
        <NavBar />
        <div className={` ${user ? "app__login" : "app__logout"}`}>
          {auth.currentUser ? <Dashboard /> : <HomePage />}
        </div>
      </Router>
    </div>
  );
}

export default App;
