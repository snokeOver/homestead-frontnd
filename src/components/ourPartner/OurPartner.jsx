import { useEffect, useState } from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import PartnerCard from "./PartnerCard";

const OurPartner = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("/partners.json")
      .then((result) => result.json())
      .then((data) => setPartners(data));
  }, []);

  return (
    <div className="py-10 px-2">
      <SectionTitle
        title="Our Partners"
        subTitle="Our partners are the cornerstone of our success, enabling seamless transactions and unparalleled service."
      />

      <div className="text-center bg-base-100 p-3 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10 px-5 group">
          {partners.map((partner, index) => (
            <PartnerCard index={index} key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartner;
