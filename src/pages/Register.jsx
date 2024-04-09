import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider.jsx";

const Register = () => {
  const { registerUser, updateProfileInfo } = useContext(AuthContext);

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
            toast("Registration Successful!");
            // verification is disabled to help protect the examiner from inconvenience

            // sendEmailVerification(result.user).then(() => {
            //   toast(
            //     "A verification link has been sent to your email to verify your account"
            //   );
            // });

            setSuccessMsg("Registration Successful!");
          })
          .catch((err) => {
            console.log(err.message);
            setErrMsg((prevData) => ({
              ...prevData,
              googleErrMsg: err.message,
            }));
          });
      })
      .catch((err) => {
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

  return (
    <div className="my-10 xl:my-28 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
      <div className="hero py-24 bg-base-100 rounded-xl">
        <div className="hero-content  w-full flex-col">
          <div className="text-center lg:text-left ">
            <h1 className="text-4xl font-bold">
              {successMsg || "Register Here"}
            </h1>
          </div>
          <div className="card w-full max-w-lg shadow-2xl bg-base-100">
            {successMsg ? (
              <div className="my-10 mx-8 min-h-24">
                <Link to="/login">
                  <button className="btn btn-primary w-full">
                    Go to Login
                  </button>
                </Link>
              </div>
            ) : (
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
                    Sign Up
                  </button>
                </div>
                <label className="label  flex justify-center">
                  <Link className="label-text-alt link link-hover" to="/login">
                    Already have an account?
                  </Link>
                </label>
              </form>
            )}
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
