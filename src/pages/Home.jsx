import React, { useContext } from "react";
import Banner from "../components/Banner";
import { AuthContext } from "../providers/AuthProvider";
import EstateSection from "../components/estateSection/EstateSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { regiSuccess } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>Homestead | Home</title>
      </Helmet>
      <Banner />
      <div className="container mx-auto">
        <EstateSection />
      </div>
    </>
  );
};

export default Home;
