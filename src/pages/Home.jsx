import Banner from "../components/Banner";
import ChooseUs from "../components/chooseUs/ChooseUs";
import EstateSection from "../components/estateSection/EstateSection";
import { Helmet } from "react-helmet-async";
import OurPartner from "../components/ourPartner/OurPartner";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
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
    </div>
  );
};

export default Home;
