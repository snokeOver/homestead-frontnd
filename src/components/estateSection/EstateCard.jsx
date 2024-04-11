import { FaLocationDot } from "react-icons/fa6";
import { LuScale3D } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { BsFillEyeFill, BsCart4 } from "react-icons/bs";

const EstateCard = ({ estate, handleShowDetailsBtn, handleAddCartButton }) => {
  return (
    <div className="card card-compact w-auto bg-base-100 rounded-xl  group-hover:scale-[0.97] hover:!scale-100 duration-500  border">
      <figure className="relative mb-3">
        <img
          className="w-full h-[17rem] "
          src={estate.image}
          alt={estate.image}
        />
        <h5 className="absolute top-5 left-5 px-3 bg-primary text-gray-100 font-semibold rounded-xl">
          {estate.status}
        </h5>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-left font-bold flex-grow">
          {estate.estate_title}
        </h2>
        <h4 className="text-md text-left">{estate.price}</h4>
        <div className="divider p-0 m-0"></div>

        <div className="grid grid-cols-3  py-3 text-message-color">
          <div className="flex flex-col items-center gap-2 text-center">
            <FaLocationDot className="text-lg" />
            <h3>{estate.location}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <LuScale3D className="text-lg" />
            <h3>{estate.area}</h3>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <IoBedOutline className="text-lg" />
            <h3>{estate.rooms_number}</h3>
          </div>
        </div>
        <div className="pt-3 flex gap-4">
          <button
            onClick={() => handleShowDetailsBtn(estate.id)}
            className="btn btn-primary btn-outline flex-1   py-3 mb-3  rounded-md"
          >
            <BsFillEyeFill className="text-xl" />
            View Property
          </button>
          <button
            onClick={() => handleAddCartButton(estate.id)}
            className="btn btn-secondary btn-outline flex-1   py-3 mb-3  rounded-md"
          >
            <BsCart4 className=" text-xl" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstateCard;
