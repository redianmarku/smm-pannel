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
          <p>
            <b>Paneli më i mirë SMM për media sociale.</b>
            <br /> Paneli ynë SMM i lirë është projektuar për t'ju ndihmuar të
            përmirësoni mediat tuaja sociale. Është një mënyrë efektive për të
            prodhuar ndjekës, abonentë, pëlqime dhe shikime për llogarinë tuaj.
            Regjistrohuni tani! Me platformën tonë miqësore për përdoruesit,
            mund të menaxhoni dhe ndiqni me lehtësi suksesin e fushatave tuaja
            në media sociale.
          </p>
          <ol>
            <li> Më shumë se 2200 shërbime të ndryshme!</li>

            <li>Më shumë se 2 milion porosi të dorëzuara klientëve tanë!</li>

            <li>Mbi 24000 përdorues!</li>
          </ol>
        </div>
      </div>
      <div className="homepage__row2">
        <CardsSection />
      </div>
      <footer class="fancy-footer">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>Përse duhet të provoni SMMAlbania?</h1>
              <p>
                SMMAlbania.com ofron shërbime të plota, duke përfshirë
                vlerësime, ndjekës dhe shikime për platformat më të njohura të
                mediave sociale si Instagram, Facebook dhe YouTube. Çfarë na
                dallon nga konkurrenca? Profesionistët tanë të kualifikuar janë
                të dedikuar për të siguruar mbështetjen më të mirë të klientëve
                dhe për të siguruar rezultatet më të mira për klientët tanë. Ne
                vazhdimisht përditësojmë dhe përmirësojmë shërbimet tona për të
                siguruar që ju të merrni më të mirën për paratë tuaja.
              </p>
            </div>
            <div class="col-md-6">
              <h3>Kontaktoni me ne</h3>
              <ul class="contact-info">
                <li>
                  <i class="fa fa-map-marker"></i>Adresa: Rruga e Durrësit,
                  Tiranë
                </li>
                <li>
                  <i class="fa fa-phone"></i>Telefoni: +355 69 213 1544
                </li>
                <li>
                  <i class="fa fa-envelope"></i>Email: info@smmalbania.com
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p class="text-center">
                &copy; 2023 SMMAlbania.com. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
