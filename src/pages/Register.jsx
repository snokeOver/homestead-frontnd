import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider.jsx";
import SpinnerAtButton from "../components/sharedComponents/SpinnerAtButton.jsx";

import GoogleButton from "../components/sharedComponents/GoogleButton.jsx";
import GithubButton from "../components/sharedComponents/GithubButton.jsx";

const Register = () => {
  const {
    registerUser,
    updateProfileInfo,
    googleRegister,
    setRegiSuccess,
    githubRegister,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    nameErrMsg: "",
    emailErrMsg: "",
    photoUrlErrMsg: "",
    passwordErrMsg: "",
    checkErrMsg: "",
    googleErrMsg: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to reset all error message
  const resetErrMsg = () => {
    setErrMsg({
      nameErrMsg: "",
      emailErrMsg: "",
      photoUrlErrMsg: "",
      passwordErrMsg: "",
      checkErrMsg: "",
      googleErrMsg: "",
    });
  };

  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPageLoading(true);
    resetErrMsg();
    setSuccessMsg("");

    if (!isChecked) {
      return setErrMsg((prevData) => ({
        ...prevData,
        checkErrMsg: "You must accept all our Terms & Conditions",
      }));
    }

    registerUser(formData.email, formData.password)
      .then((result) => {
        const user = result.user;

        // update user with additional information
        updateProfileInfo(user, {
          displayName: formData.name,
          photoURL: formData.photoUrl,
        })
          .then((result) => {
            firebaseRegiSuccess();
          })
          .catch((err) => {
            firebaseRegisterError(err);
          });
      })
      .catch((err) => {
        firebaseRegisterError(err);
      });

    setSubmitSuccess(true);
    setIsChecked(false);
    setFormData({
      name: "",
      email: "",
      photoUrl: "",
      password: "",
    });
  };

  // This should check whether the T & C  are checked or not
  useEffect(() => {
    if (!submitSuccess) {
      if (isChecked)
        return setErrMsg((prevData) => ({ ...prevData, checkErrMsg: "" }));
      else
        return setErrMsg((prevData) => ({
          ...prevData,
          checkErrMsg: "You must accept all our Terms & Conditions.",
        }));
    }
  }, [isChecked]);

  // This should check for Name validation
  useEffect(() => {
    if (!submitSuccess) {
      if (formData.name.length < 4) {
        return setErrMsg((prevData) => ({
          ...prevData,
          nameErrMsg: "Your name should be at least 4 characters.",
        }));
      } else {
        return setErrMsg((prevData) => ({
          ...prevData,
          nameErrMsg: "",
        }));
      }
    }
  }, [formData.name]);

  // This should check for Photo Url validation
  useEffect(() => {
    if (!submitSuccess) {
      if (!/^http/.test(formData.photoUrl)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          photoUrlErrMsg: "Photo URL must start with 'http'",
        }));
      } else {
        return setErrMsg((prevData) => ({
          ...prevData,
          photoUrlErrMsg: "",
        }));
      }
    }
  }, [formData.photoUrl]);

  // This should check for password validation
  useEffect(() => {
    if (!submitSuccess) {
      if (formData.password.length < 6) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password should be at least 6 characters.",
        }));
      } else if (!/[A-Z]/.test(formData.password)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password must include at least one upper case!",
        }));
      } else if (!/[a-z]/.test(formData.password)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password must include at least one upper case!",
        }));
      } else if (!/[0-9]/.test(formData.password)) {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "Password must include at least one number!",
        }));
      } else {
        return setErrMsg((prevData) => ({
          ...prevData,
          passwordErrMsg: "",
        }));
      }
    }
  }, [formData.password]);

  // This is for first render
  useEffect(() => {
    resetErrMsg();
  }, []);

  // handle the Go to button
  const handleGoToButton = () => {
    setRegiSuccess(false);
  };

  // handle the Register with Google button
  const handleGoogleRegister = () => {
    googleRegister()
      .then((result) => {
        firebaseRegiSuccess();
      })
      .catch((err) => {
        firebaseRegisterError(err);
      });
  };

  // Handle the Register with Github button
  const handleGithubRegister = () => {
    githubRegister()
      .then((result) => {
        firebaseRegiSuccess();
      })
      .catch((err) => {
        firebaseRegisterError(err);
      });
  };

  // handle Firebase error while registering
  const firebaseRegisterError = (err) => {
    console.log(err.message);
    console.log(err.code);
    if (err.code === "auth/email-already-in-use") {
      setErrMsg((prevData) => ({
        ...prevData,
        googleErrMsg: `${formData.email} is already taken.`,
      }));
    } else
      setErrMsg((prevData) => ({ ...prevData, googleErrMsg: err.message }));
    setSuccessMsg("");
    setPageLoading(false);
  };

  // Handle firebase Registration success
  const firebaseRegiSuccess = () => {
    setPageLoading(false);
    toast("Registration Successful!");
    setSuccessMsg("Registration Successful!");
  };

  return (
    <div className="my-10  container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
      <div className="hero py-10 bg-base-100 rounded-xl">
        <div className="hero-content  w-full flex-col">
          <div className="text-center lg:text-left ">
            <h1 className="text-4xl font-bold">
              {successMsg || "Register Here"}
            </h1>
          </div>
          <div className="card w-full max-w-lg shadow-2xl bg-base-100">
            {successMsg ? (
              <div className="my-10 mx-8 min-h-24">
                <Link to="/user-profile">
                  <button
                    onClick={handleGoToButton}
                    className="btn btn-primary w-full"
                  >
                    Go to Your Profile
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <form className="card-body" onSubmit={handleFormSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={formData.name || ""}
                      className="input input-bordered"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errMsg.nameErrMsg && (
                    <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                      {errMsg.nameErrMsg}
                    </p>
                  )}
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
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Photo URL</span>
                    </label>
                    <input
                      type="text"
                      name="photoUrl"
                      placeholder="photo url"
                      value={formData.photoUrl || ""}
                      className="input input-bordered"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errMsg.photoUrlErrMsg && (
                    <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                      {errMsg.photoUrlErrMsg}
                    </p>
                  )}
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
                      className="absolute right-5 top-[3.25rem]"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <BsEyeSlashFill /> : <BsFillEyeFill />}
                    </span>
                    {errMsg.passwordErrMsg && (
                      <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                        {errMsg.passwordErrMsg}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <a href="#" className="label-text-alt link link-hover">
                      Accept All Terms & Conditions
                    </a>
                  </div>
                  {(errMsg.googleErrMsg || errMsg.checkErrMsg) && (
                    <p className="text-red-500 dark:text-yellow-400 dark:font-light text-center mt-3">
                      {errMsg.googleErrMsg || errMsg.checkErrMsg}
                    </p>
                  )}

                  <div className="form-control mt-6">
                    <button
                      disabled={
                        errMsg.nameErrMsg ||
                        errMsg.photoUrlErrMsg ||
                        errMsg.passwordErrMsg
                      }
                      className="btn btn-primary "
                    >
                      {pageLoading && <SpinnerAtButton />}
                      Register
                    </button>
                  </div>
                </form>
                <div className="divider px-4">OR</div>
                <div className="card-body pt-0">
                  {/* Register with google */}
                  <div className="form-control mt-6">
                    <GoogleButton
                      text="Register with Google"
                      handleBtn={handleGoogleRegister}
                    />
                  </div>
                  {/* Register with GitHub */}
                  <div className="form-control mt-6">
                    <GithubButton
                      text="Register with Github"
                      handleBtn={handleGithubRegister}
                    />
                  </div>
                  <label className="label  flex justify-center mt-5">
                    <Link
                      className="label-text-alt link link-hover"
                      to="/login"
                    >
                      Already have an account?
                    </Link>
                  </label>
                </div>
              </>
            )}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
