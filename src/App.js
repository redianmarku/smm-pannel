import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { instance_services, url } from "./axios";
import HomeScreen from "./components/HomeScreen";
import { setS } from "./features/servicesSlice";
import API_KEY from "./Requests";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data_service = {
      key: API_KEY,
      action: "services",
    };
    async function fetchData() {
      const request = await instance_services.post(url, data_service);
      dispatch(setS(request.data));
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Router>
        <HomeScreen />
      </Router>
    </div>
  );
}

export default App;
