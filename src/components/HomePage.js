import React, { useState } from "react";
import CardsSection from "./utils/Card";
import "./HomePage.css";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";

function HomePage() {
  const [activeRegister, setactiveRegister] = useState(false);
  const handleActive = () => {
    setactiveRegister(true);
  };

  const handleDeactive = () => {
    setactiveRegister(false);
  };
  return (
    <div className="homepage">
      <div className="homepage__row1">
        <div className="homepage__left">
          {activeRegister === false ? <Login /> : <Signup />}
          <div className="form__switcher">
            {activeRegister === false ? (
              <p>
                Nuk keni nje llogari ne platformen tone?{" "}
                <button
                  id="signup"
                  style={{ color: "blue" }}
                  onClick={handleActive}
                >
                  Regjistrohu
                </button>
              </p>
            ) : (
              <p>
                Keni nje llogari ne platformen tone?{" "}
                <button
                  id="login"
                  style={{ color: "blue" }}
                  onClick={handleDeactive}
                >
                  Hyr
                </button>
              </p>
            )}
          </div>
        </div>
        <div className="homepage__right">
          <h1>Doni te shtoni followers ne Instagram? Jeni ne vendin e duhur</h1>
          <ol>
            <li> More than 2000 different services.</li>

            <li>Over 2 million orders delivered</li>

            <li>Above 20000 users</li>
          </ol>
          Trusted for 5+ Years for Professional Social Media Automation
          Solutions!
        </div>
      </div>
      <div className="homepage__row2">
        <CardsSection />
      </div>
    </div>
  );
}

export default HomePage;
