import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";
import { LuScale3D } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { FaTrowelBricks } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import PageSkeleton from "../components/sharedComponents/PageSkeleton";
import { Helmet } from "react-helmet-async";
import { getPropertyIds, storePropertyId } from "../services/storeCartItems";

const EstateDetails = () => {
  const { user, estates, setCartNumber, setToastMsg } = useContext(AuthContext);
  const navigate = useNavigate();
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
  const smoothTransition = () => {
    document
      .querySelector("#targetSection")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Handle the add to cart button
  const handleAddCartButton = (id) => {
    if (!user) {
      navigate("/login");
      window.scrollTo(0, 0);
    }
    const result = getPropertyIds(user?.email);
    if (result.includes(id)) {
      return setToastMsg("Property Already Added To Cart  !");
    } else {
      storePropertyId(user?.email, id);
      setCartNumber(result.length + 1);
      return setToastMsg("Property added succesfully  !");
    }
  };

  useEffect(() => {
    if (!pageLoading) smoothTransition();
  }, [pageLoading]);

  return (
    <>
      <Helmet>
        <title>Homestead | Estate Details</title>
      </Helmet>
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
              <figure
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-easing="ease-in-sine"
                className="w-full mx-auto rounded-xl "
              >
                <img
                  className="h-full py-4 "
                  src={estateToShow.image}
                  alt={estateToShow.estate_title}
                />
              </figure>
              <div className="card-body text-left w-full">
                <h2
                  data-aos="fade-down"
                  data-aos-duration="800"
                  data-aos-delay="100"
                  data-aos-easing="ease-in-sine"
                  className="card-title text-2xl md:text-4xl font-bold text-heading-color playfair-font"
                >
                  {estateToShow.estate_title}
                </h2>

                <div className="flex justify-between  font-mediumpy-5 mt-3 text-message-color">
                  <h4
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-delay="150"
                    data-aos-easing="ease-in-sine"
                    className="text-lg text-left"
                  >
                    {estateToShow.price}
                  </h4>
                  <h5
                    data-aos="fade-left"
                    data-aos-duration="800"
                    data-aos-delay="200"
                    data-aos-easing="ease-in-sine"
                    className=" px-4 py-1 bg-primary text-gray-100 font-semibold rounded-xl"
                  >
                    {estateToShow.status}
                  </h5>
                </div>

                <div
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="250"
                  data-aos-easing="ease-in-sine"
                  className="my-2"
                >
                  <span className="font-extrabold text-lg mr-2">
                    Description:
                  </span>
                  <br />
                  <p className="text-justify">{estateToShow.description}</p>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="300"
                  data-aos-easing="ease-in-sine"
                  className="my-2"
                >
                  <div className="flex flex-col md:flex-row gap-3">
                    {estateToShow.facilities.map((item) => (
                      <div>
                        <div
                          className="bg-primary font-medium rounded-lg px-4 py-1 inline-block"
                          key={item}
                        >
                          #{item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="bg-red-500">
                  <p className="bg-green-500 inline-block">#living-room</p>
                </div> */}
                <div className="divider mb-0"></div>
                <div className="flex flex-col gap-3 font-medium  pt-5 text-message-color">
                  <div
                    data-aos="fade-left"
                    data-aos-duration="800"
                    data-aos-delay="350"
                    data-aos-easing="ease-in-sine"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <FaLocationDot className="text-lg" />
                      <h3 className="text-message-color">Location:</h3>
                    </div>
                    <span className="font-bold">{estateToShow.location}</span>
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-delay="400"
                    data-aos-easing="ease-in-sine"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <IoBedOutline className="text-lg" />
                      <h3 className="text-message-color">Number of Rooms:</h3>
                    </div>
                    <span className="font-bold">
                      {estateToShow.rooms_number}
                    </span>
                  </div>
                  <div
                    data-aos="fade-left"
                    data-aos-duration="800"
                    data-aos-delay="450"
                    data-aos-easing="ease-in-sine"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <LuScale3D className="text-lg" />
                      <h3 className="text-message-color">Total Areas:</h3>
                    </div>
                    <span className="font-bold">{estateToShow.area}</span>
                  </div>
                  <div
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-delay="500"
                    data-aos-easing="ease-in-sine"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
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

                <div
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="600"
                  data-aos-easing="ease-in-sine"
                  className="flex gap-10 w-[90%] mx-auto mt-8"
                >
                  <button
                    onClick={() => handleAddCartButton(estateToShow.id)}
                    className="btn btn-primary flex-1   py-3 mb-3  rounded-md"
                  >
                    <BsCart4 className=" text-xl" />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EstateDetails;
