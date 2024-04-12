import Banner from "../components/Banner";
import ChooseUs from "../components/chooseUs/ChooseUs";
import EstateSection from "../components/estateSection/EstateSection";
import { Helmet } from "react-helmet-async";
import OurPartner from "../components/ourPartner/OurPartner";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const { currTheme } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>Homestead | Home</title>
      </Helmet>
      <Banner />
      <div className="container mx-auto">
        <EstateSection />
      </div>
      <ChooseUs />
      <div className="container mx-auto">
        <OurPartner />
      </div>

      <ToastContainer theme={currTheme} />
    </>
  );
};

export default Home;
