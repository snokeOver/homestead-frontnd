import React, { useContext } from "react";
import Banner from "../components/Banner";
import { AuthContext } from "../providers/AuthProvider";
import EstateSection from "../components/estateSection/EstateSection";

const Home = () => {
  const { regiSuccess } = useContext(AuthContext);
  return (
    <>
      <Banner />
      <div className="container mx-auto">
        <EstateSection />
      </div>
    </>
  );
};

export default Home;
