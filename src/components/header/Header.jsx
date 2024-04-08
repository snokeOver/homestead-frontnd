import React from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";

const Header = () => {
  return (
    <>
      <div className="bg-base-100">
        <div className="container mx-auto">
          <NavBar />
        </div>
      </div>
      <div className="container mx-auto">
        <Banner />
      </div>
    </>
  );
};

export default Header;
