import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <div className="app">
      <Router>
        <HomeScreen />
      </Router>
    </div>
  );
}

export default App;
