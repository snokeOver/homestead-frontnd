import React from "react";
import { NavLink } from "react-router-dom";
import SocialLinks from "../sharedComponents/SocialLinks";

const Footer = () => {
  return (
    <footer className=" p-10 bg-base-100 text-base-content">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 ">
        <div className="footer  flex justify-center">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Selling</a>
            <a className="link link-hover">Buying</a>
            <a className="link link-hover">Marketing</a>
          </nav>
        </div>
        <div className="footer flex justify-center">
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">Our Branches</a>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
          </nav>
        </div>
        <div className="footer flex justify-center">
          <nav>
            <h6 className="footer-title">Links</h6>
            <a className="link link-hover">Pricing Plan</a>
            <a className="link link-hover">Advertising</a>
            <a className="link link-hover">Testimonials</a>
          </nav>
        </div>
        <div className="footer flex justify-center">
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </div>
      <div className="divider py-10"></div>
      <div className="footer footer-center ">
        <nav className="grid grid-flow-col gap-4">
          <NavLink className="link link-hover" to="/">
            Home
          </NavLink>
          <div className="divider divider-horizontal"></div>
          <NavLink className="link link-hover" to="/about">
            About Us
          </NavLink>
          <div className="divider divider-horizontal"></div>
          <NavLink className="link link-hover" to="/contact">
            Contact Us
          </NavLink>
        </nav>
        <SocialLinks />
        <aside className="text-xs">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            HOMESTEAD
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
