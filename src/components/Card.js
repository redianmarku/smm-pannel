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
        <h3>Card 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
          euismod odio, gravida pellentesque urna varius vitae.
        </p>
      </div>
      <div className="card">
        <h3>Card 2</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
          euismod odio, gravida pellentesque urna varius vitae.
        </p>
      </div>
      <div className="card">
        <h3>Card 3</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
          euismod odio, gravida pellentesque urna varius vitae.
        </p>
      </div>
    </section>
  );
};

export default CardsSection;
