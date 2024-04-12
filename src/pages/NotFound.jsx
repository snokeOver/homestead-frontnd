import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Homestead | Not Found</title>
      </Helmet>
      <div className="my-10 xl:my-28 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="hero py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center work-font">
            <div className="max-w-md">
              <h1
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="text-5xl font-bold "
              >
                404! <span className="playfair-font">Not Found</span>
              </h1>
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="800"
                data-aos-easing="ease-in-sine"
                className="py-6"
              >
                The page your are looking for was not found!
              </p>
              <NavLink to="/">
                <button
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="1500"
                  data-aos-easing="ease-in-sine"
                  className="btn bg-primary text-gray-100"
                >
                  Go Home
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
