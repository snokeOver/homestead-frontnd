import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";
import { LuScale3D } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { FaTrowelBricks } from "react-icons/fa6";
import PageSkeleton from "../components/sharedComponents/PageSkeleton";

const EstateDetails = () => {
  const { estates } = useContext(AuthContext);
  const [estateToShow, setEstateToShow] = useState({});
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);

  // filter out the estate which details will be shown
  useEffect(() => {
    setEstateToShow(estates.find((estate) => estate.id === parseInt(id)));
    if (estates) {
      setPageLoading(false);
    }
  }, [estates]);

  // for smooth scroll to the target section
  function smoothTransition() {
    document
      .querySelector("#targetSection")
      .scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    console.log;
    if (!pageLoading) smoothTransition();
  }, [pageLoading]);

  return (
    <div className="my-10 lg:my-20 container mx-auto px-5 xl:px-0 min-h-screen">
      <div className="card card-compact w-full bg-base-100   px-4 py-4 work-font">
        {pageLoading ? (
          <div>
            <PageSkeleton />
          </div>
        ) : (
          <div
            id="targetSection"
            className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:p-8"
          >
            <figure className="w-full mx-auto rounded-xl ">
              <img
                className="h-full py-4 "
                src={estateToShow.image}
                alt={estateToShow.estate_title}
              />
            </figure>
            <div className="card-body text-left w-full">
              <h2 className="card-title text-2xl md:text-4xl font-bold text-heading-color playfair-font">
                {estateToShow.estate_title}
              </h2>

              <div className="flex justify-between  font-mediumpy-5 mt-3 text-message-color">
                <h4 className="text-lg text-left">{estateToShow.price}</h4>
                <h5 className=" px-4 py-1 bg-primary text-gray-100 font-semibold rounded-xl">
                  {estateToShow.status}
                </h5>
              </div>

              <div className="my-2">
                <span className="font-extrabold text-lg mr-2">
                  Description:
                </span>{" "}
                <br />
                <p className="text-justify">{estateToShow.description}</p>
              </div>
              <div className="my-2">
                <span>
                  {estateToShow.facilities.map((item) => (
                    <span
                      className="bg-primary font-medium rounded-lg px-4 py-1  mr-4"
                      key={item}
                    >
                      #{item}
                    </span>
                  ))}
                </span>
              </div>
              <div className="divider mb-0"></div>
              <div className="flex flex-col gap-3 font-medium  pt-5 text-message-color">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3">
                    <FaLocationDot className="text-lg" />
                    <h3 className="text-message-color">Location:</h3>
                  </div>
                  <span className="font-bold">{estateToShow.location}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3">
                    <IoBedOutline className="text-lg" />
                    <h3 className="text-message-color">Number of Rooms:</h3>
                  </div>
                  <span className="font-bold">{estateToShow.rooms_number}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3">
                    <LuScale3D className="text-lg" />
                    <h3 className="text-message-color">Total Areas:</h3>
                  </div>
                  <span className="font-bold">{estateToShow.area}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3">
                    <FaTrowelBricks className="text-lg" />
                    <h3 className="text-message-color">
                      Year of Construction:
                    </h3>
                  </div>
                  <span className="font-bold">
                    {estateToShow.established_year}
                  </span>
                </div>
              </div>

              {/* <div className="flex gap-10">
            <button
              onClick={() => handleReadButton(booksToShow.bookId)}
              className="mt-5 lg:mt-14 btn text-gray-600   lg:text-xl font-bold px-4 py-0 md:px-6 md:py-3 lg:px-8 lg:py-4 h-auto border border-gray-300 bg-gray-50  rounded-md"
            >
              Read
            </button>
            <button
              onClick={() => handleWishButton(booksToShow.bookId)}
              className="mt-5 lg:mt-14 btn text-gray-100 bg-[#50B1C9] hover:bg-[#59CEEE]   lg:text-xl font-bold px-4 py-0 md:px-6 md:py-3 lg:px-8 lg:py-4 h-auto border-none rounded-md"
            >
              Wishlist
            </button>
          </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstateDetails;
