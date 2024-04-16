import { useContext } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import EstateCard from "./EstateCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { getPropertyIds, storePropertyId } from "../../services/storeCartItems";

const EstateSection = () => {
  const { user, estates, setCartNumber, setToastMsg } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle the show property button
  const handleShowDetailsBtn = (id) => {
    navigate(`/estate-details/${id}`);
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    if (!user) {
      navigate("/login");
      return window.scrollTo(0, 0);
    }
    const result = getPropertyIds(user?.email);
    if (result.includes(id)) {
      return setToastMsg("Property already added to cart  !");
    } else {
      storePropertyId(user?.email, id);
      setCartNumber(result.length + 1);
      return setToastMsg("Property added succesfully  !");
    }
  };

  return (
    <div className="py-10 px-2 w-full overflow-hidden">
      <SectionTitle
        title="Popular Properties"
        subTitle="Recent properties  offer modern amenities, convenient locations, and stylish designs to meet the evolving needs of yours."
      />
      <div className="text-center bg-base-100 py-3 px-1 md:p-3 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:px-5 group">
          {estates.map((estate) => (
            <EstateCard
              key={estate.id}
              estate={estate}
              handleShowDetailsBtn={handleShowDetailsBtn}
              handleAddCartButton={handleAddCartButton}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstateSection;
