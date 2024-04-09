import React, { useContext } from "react";
import Banner from "../components/Banner";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const { regiSuccess } = useContext(AuthContext);
  return (
    <>
      <Banner />
      <div className="container mx-auto"></div>
    </>
  );
};

export default Home;
