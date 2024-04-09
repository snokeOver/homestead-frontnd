import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="my-10 xl:my-28 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
      <div className="hero py-10 rounded-lg bg-base-200">
        <div className="hero-content text-center work-font">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold ">
              404! <span className="playfair-font">Not Found</span>
            </h1>
            <p className="py-6">The page your are looking for was not found!</p>
            <NavLink to="/">
              <button className="btn bg-primary text-gray-100">Go Home</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
