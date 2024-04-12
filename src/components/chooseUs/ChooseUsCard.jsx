import { FaRegNewspaper } from "react-icons/fa6";
import { FaPeopleCarry } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";
import { FaPeopleRobbery } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";

const ChooseUsCard = ({ reason }) => {
  // Map the string representation to the corresponding icon component
  const iconComponents = {
    FaRegNewspaper: FaRegNewspaper,
    FaPeopleCarry: FaPeopleCarry,
    FaWarehouse: FaWarehouse,
    GrAnnounce: GrAnnounce,
    FaPeopleRobbery: FaPeopleRobbery,
    FaMapLocationDot: FaMapLocationDot,
  };

  // Get the icon component based on the image string from JSON data
  const IconComponent = iconComponents[reason.image];

  return (
    <div className="flex gap-5 group-hover:scale-[.88] hover:!scale-100 duration-500">
      <IconComponent className="text-7xl" /> {/* Render the icon component */}
      <div className="text-left">
        <h3 className="mb-2">{reason.title}</h3>
        <p className="text-sm">{reason.description}</p>
      </div>
    </div>
  );
};

export default ChooseUsCard;
