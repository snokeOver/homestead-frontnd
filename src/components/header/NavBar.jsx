import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import ThemeButton from "./ThemeButton";
import { IoHome } from "react-icons/io5";
const NavBar = () => {
  const { loading, user } = useContext(AuthContext);

  const handleLogOut = () => {
    //   logOut()
    //     .then((result) => {
    //       console.log(result);
    //       setUser(null);
    //     })
    //     .catch((err) => console.log(err.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/user-profile">User Profile</NavLink>
      </li>
      <li>
        <NavLink to="/update-profile">Update Profile</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div>
          <NavLink
            className="text-3xl font-semibold font-rubik flex items-center gap-2"
            to="/"
          >
            <IoHome className="bg-blue-600 dark:bg-blue-700 rounded-full p-[.36rem] text-gray-200" />
            <span className="hidden md:flex">Homestead</span>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <ThemeButton />

        {user ? (
          <>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://i.ibb.co/vxg6nY4/user.png"
                />
              </div>
            </div>
            <Link
              onClick={handleLogOut}
              className="btn btn-neutral px-10 rounded-none btn-sm"
              to="/"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            {loading ? (
              <span className="loading loading-spinner text-warning"></span>
            ) : (
              <Link
                className="btn btn-neutral px-3 rounded-sm btn-sm"
                to="/login"
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
