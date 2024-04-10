import { useContext, useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import EstateCard from "./EstateCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const EstateSection = () => {
  const { estates } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowDetailsBtn = (id) => {
    console.log("show Details");
    navigate(`/estate-details/${id}`);
  };

  return (
    <div className="py-10 lg:py-20 px-2">
      <SectionTitle
        title="Popular Properties"
        subTitle="Recent properties  offer modern amenities, convenient locations, and stylish designs to meet the evolving needs of yours."
      />
      <div className="text-center bg-base-100 p-3 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-5 group">
          {estates.map((estate) => (
            <EstateCard
              key={estate.id}
              estate={estate}
              handleShowDetailsBtn={handleShowDetailsBtn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstateSection;
