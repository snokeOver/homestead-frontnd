import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

const Contact = () => {
  const { currTheme } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [darkMode, setDarkMode] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Submitted! We'll Contact You Soon.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <>
      <Helmet>
        <title>Homestead | Contact</title>
      </Helmet>
      <div className="my-10 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="hero py-10 mt-10 bg-base-200 rounded-lg md:w-[90%] mx-auto">
          <div className="hero-content flex-col lg:gap-24 lg:flex-row-reverse">
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-easing="ease-in-sine"
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl font-bold">Contact now!</h1>
              <p className="py-6">
                Tell us what is your querry and we'll contact you soon.
              </p>
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-easing="ease-in-sine"
              className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
              <form
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-delay="1200"
                data-aos-easing="ease-in-sine"
                className="card-body"
                onSubmit={handleSubmit}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="name@yourdomain.com"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message || ""}
                    onChange={handleChange}
                    placeholder="Write your message here"
                    className="input input-bordered h-auto"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn bg-primary text-gray-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer theme={currTheme} />
      </div>
    </>
  );
};

export default Contact;
