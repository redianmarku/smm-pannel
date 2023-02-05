import React, { useState } from "react";
import "./HomePage.css";
import Login from "./Login";
import Signup from "./Signup";

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
                <button onClick={handleActive}>Regjistrohu</button>
              </p>
            ) : (
              <p>
                Keni nje llogari ne platformen tone?{" "}
                <button onClick={handleDeactive}>Hyr</button>
              </p>
            )}
          </div>
        </div>
        <div className="homepage__right">
          <h1>Right</h1>
        </div>
      </div>
      <div className="homepage__row2">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </div>
    </div>
  );
}

export default HomePage;
