import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider.jsx";

const Login = () => {
  const { signInUser, user, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [googleErrMsg, setGoogleErrMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (googleErrMsg) {
      toast(googleErrMsg);
    }
  }, [googleErrMsg]);

  // This should handle submission of form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setGoogleErrMsg("");
    setSuccessMsg("");

    signInUser(formData.email, formData.password)
      .then((result) => {
        const user = result.user;

        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.code);
        if (err.code === "auth/invalid-credential") {
          setGoogleErrMsg("Either email or password is wrong!");
        } else {
          setGoogleErrMsg(err.code);
        }
        setSuccessMsg("");
      });
    setLoading(false);
    setFormData({
      email: "",
      password: "",
    });
  };

  // This is for first render
  useEffect(() => {
    setGoogleErrMsg();
  }, []);

  return (
    <div className="my-10 xl:my-28 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
      <div className="hero py-24 bg-base-100 rounded-xl">
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
                  className="absolute right-5 top-[3.25rem]"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <BsEyeSlashFill /> : <BsFillEyeFill />}
                </span>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary ">Login</button>
              </div>
              <label className="label  flex justify-center">
                <Link className="label-text-alt link link-hover" to="/register">
                  Don't have an account?
                </Link>
              </label>
            </form>

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
