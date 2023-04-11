import React, { useState, useRef, useEffect } from "react";

const CardsSection = () => {
  const [backgroundPos, setBackgroundPos] = useState({ x: 0, y: 0 });
  const cardsRef = useRef(null);

  //   useEffect(() => {
  //     const handleMouseMove = (event) => {
  //       const x = event.clientX / window.innerWidth;
  //       const y = event.clientY / window.innerHeight;

  //       setBackgroundPos({ x, y });
  //     };

  //     cardsRef.current.addEventListener("mousemove", handleMouseMove);

  //     return () => {
  //       cardsRef.current.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   }, []);

  return (
    <section
      id="cards"
      ref={cardsRef}
      className="cards_section"
      style={{
        margin: 0,
        width: "100%",
        padding: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "500px",
        backgroundImage: "url(https://i.imgur.com/2X2ROGg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: `${backgroundPos.x * 100}% ${
          backgroundPos.y * 100
        }%`,
      }}
    >
      <div className="card">
        <h3>Pse duhet të provoni panelin tonë SMM</h3>
        <p>
          <b>Çmimet më të ulëta:</b> Ne ofrojmë çmimet më të ulëta që fillon nga
          $ 0.001.
          <br />
          <b>Lehtë për t'u përdorur:</b> Paneli ynë SMM është i lehtë për t'u
          përdorur, me një ndërfaqe miqësore për përdoruesit.
        </p>
      </div>
      <div className="card">
        <h3> Dërgim më i shpejtë</h3>
        <p>
          <b>Përpunimi</b> i porosive me shpejtësi dhe efikasitet. <br />
          <b>Pagesa e sigurt</b>: Ne ofrojmë pagesa të sigurta përmes PayPal ose
          metoda të tjera.
        </p>
      </div>
      <div className="card">
        <h3>Shumëllojshmëri e shërbimeve</h3>
        <p>
          <b>Gama</b> e gjerë e shërbimeve, si pëlqime, ndjekës, shikime dhe më
          shumë. <br />
          <b>Shërbim cilësor:</b>
          Ne mundohemi të sigurojmë 100% kënaqësi të klientit.
        </p>
      </div>
    </section>
  );
};

export default CardsSection;
