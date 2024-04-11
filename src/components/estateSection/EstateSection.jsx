import { useContext, useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import EstateCard from "./EstateCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { getPropertyIds, storePropertyId } from "../../services/storeCartItems";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EstateSection = () => {
  const { estates, setCartNumber } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle the show property button
  const handleShowDetailsBtn = (id) => {
    navigate(`/estate-details/${id}`);
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    const result = getPropertyIds();
    if (result.includes(id)) {
      return toast("Property Already Added To Cart");
    } else {
      storePropertyId(id);
      setCartNumber(result.length + 1);
      return toast("Property Added Succesfully");
    }
  };

  return (
    <div className="py-10 px-2">
      <SectionTitle
        title="Popular Properties"
        subTitle="Recent properties  offer modern amenities, convenient locations, and stylish designs to meet the evolving needs of yours."
      />
      <div className="text-center bg-base-100 p-3 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-5 group">
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
      <ToastContainer />
    </div>
  );
};

export default EstateSection;
