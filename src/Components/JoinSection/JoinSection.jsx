import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

const JoinSection = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000); // Reset after 2 seconds to match the animation duration
  };

  return (
    <div className="my-8 p-8 bg-pink-200 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">¡ÚNETE A LA TRIBU!</h2>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipisicing
        elit.
      </p>
      <button
        onClick={handleClick}
        className={`bg-yellow-400 py-2 px-4 rounded-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
          clicked ? "shine" : ""
        }`}
      >
        <Link to="/joinus">
          <span>¡Adquiere tu membresía!</span>
        </Link>
      </button>
    </div>
  );
};

export default JoinSection;
