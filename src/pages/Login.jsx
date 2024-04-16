import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider.jsx";
import SpinnerAtButton from "../components/sharedComponents/SpinnerAtButton.jsx";
import GithubButton from "../components/sharedComponents/GithubButton.jsx";
import GoogleButton from "../components/sharedComponents/GoogleButton.jsx";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const {
    signInUser,
    googleRegister,
    githubRegister,
    logOutSuccess,
    setLogOutSuccess,
    setToastMsg,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [googleErrMsg, setGoogleErrMsg] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle errors toast
  useEffect(() => {
    if (googleErrMsg) {
      setToastMsg(googleErrMsg);
    }
  }, [googleErrMsg]);

  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPageLoading(true);
    setGoogleErrMsg("");

    signInUser(formData.email, formData.password)
      .then((result) => {
        firebaseLoginSuccess(result);
      })
      .catch((err) => {
        firebaseLoginError(err);
      });
    setFormData({
      email: "",
      password: "",
    });
  };

  // This is for first render
  useEffect(() => {
    setGoogleErrMsg();
  }, []);

  // handle the Register with Google button
  const handleGoogleRegister = () => {
    googleRegister()
      .then((result) => {
        firebaseLoginSuccess(result);
      })
      .catch((err) => {
        firebaseLoginError(err);
      });
  };

  // Handle the Register with Github button
  const handleGithubRegister = () => {
    githubRegister()
      .then((result) => {
        firebaseLoginSuccess(result);
      })
      .catch((err) => {
        firebaseLoginError(err);
      });
  };

  // handle Firebase error while registering
  const firebaseLoginError = (err) => {
    console.log(err.message);
    console.log(err.code);
    if (err.code === "auth/invalid-credential") {
      setGoogleErrMsg("Either email or password is wrong  !");
    } else {
      setGoogleErrMsg(err.code);
    }
    setPageLoading(false);
  };

  // Handle All successful firebase Login
  const firebaseLoginSuccess = (result) => {
    setToastMsg("Login Successful  !");
    const user = result.user;
    setPageLoading(false);
    navigate(location?.state ? location.state : "/");
  };

  // Log Out success Toast
  useEffect(() => {
    if (logOutSuccess) {
      setToastMsg("Log out successfull  !");
      setLogOutSuccess(false);
    }
  }, [logOutSuccess]);

  return (
    <>
      <Helmet>
        <title>Homestead | Login</title>
      </Helmet>
      <div className="my-10  container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="hero bg-base-100 rounded-xl">
          <div className="hero-content  w-full flex-col">
            <div className="text-center lg:text-left ">
              <h1 className="text-4xl font-bold">Login Here</h1>
            </div>
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleFormSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={formData.email || ""}
                    className="input input-bordered"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="************"
                    value={formData.password || ""}
                    className="input input-bordered"
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute right-5 top-[3.05rem]"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <BsEyeSlashFill className="text-2xl cursor-pointer text-secondary" />
                    ) : (
                      <BsFillEyeFill className="text-2xl cursor-pointer text-secondary" />
                    )}
                  </span>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary ">
                    {pageLoading && <SpinnerAtButton />}
                    Login
                  </button>
                </div>
              </form>
              <div className="divider px-4">OR</div>
              <div className="card-body pt-0">
                {/* Login with google */}
                <div className="form-control mt-6">
                  <GoogleButton
                    text="Login with Google"
                    handleBtn={handleGoogleRegister}
                  />
                </div>
                {/* Login with GitHub */}
                <div className="form-control mt-6">
                  <GithubButton
                    text="Login with Github"
                    handleBtn={handleGithubRegister}
                  />
                </div>
                <label className="label  flex justify-center mt-5">
                  <Link
                    className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold "
                    to="/register"
                  >
                    Don't have an account?
                  </Link>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
