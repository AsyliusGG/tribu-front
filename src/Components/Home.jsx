import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel/Carousel";
import JoinSection from "./JoinSection/JoinSection";
import { Alert } from "@material-tailwind/react";

function AlertCustomStyles({ message }) {
  return (
    <Alert
      color="green"
      className="fixed top-20 right-4 z-50"
      style={{ width: "auto", minWidth: "200px" }}
    >
      {message}
    </Alert>
  );
}

const Home = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const user = useSelector((state) => state.auth.user); // Obtiene los datos del usuario

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div>
      {successMessage && <AlertCustomStyles message={successMessage} />}
      {user && (
        <Carousel />
      )}
      {!isAuthenticated && <JoinSection />}
    </div>
  );
};

export default Home;
