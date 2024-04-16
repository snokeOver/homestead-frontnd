import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaLock } from "react-icons/fa";
import SpinnerAtButton from "../components/sharedComponents/SpinnerAtButton";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
  const { user, updateProfileInfo, setProfileUpdate, setToastMsg } =
    useContext(AuthContext);
  const [pageLoading, setPageLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  const [formData, setFormData] = useState({
    name: user.displayName || "",
    photoUrl: user.photoURL || "",
  });

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBtnDisabled(false);
  };

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  // handle Update profile section
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setPageLoading(true);
    updateProfileInfo(user, {
      displayName: formData.name,
      photoURL: formData.photoUrl,
    })
      .then((result) => {
        setFirebaseError("");
        setUpdateMsg("Profile updated successfully!");
        setProfileUpdate(true);
        setPageLoading(false);
      })
      .catch((err) => {
        setFirebaseError(err.code);
        setUpdateMsg("");
        setPageLoading(false);
      });
  };

  // handle error and success message & toast
  useEffect(() => {
    if (firebaseError) {
      setToastMsg(firebaseError);

      setFirebaseError("");
    }
    if (updateMsg) {
      setToastMsg(updateMsg);

      setUpdateMsg("");
    }
    setBtnDisabled(true);
  }, [firebaseError, updateMsg]);

  return (
    <>
      <Helmet>
        <title>Homestead | Update Profile</title>
      </Helmet>
      <div className="my-10 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen w-full overflow-hidden">
        <div className=" flex flex-col gap-6">
          <div className="card  w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
            <div className="card-body flex items-center ">
              <h2
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="card-title text-2xl md:text-3xl"
              >
                Update Your Profile
              </h2>
              <div className="w-48 mt-5">
                <img
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="200"
                  data-aos-easing="ease-in-sine"
                  className="rounded-md"
                  alt="User Photo"
                  src={user?.photoURL || fallbackPPUrl}
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <div className="card card-compact mt-8 w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
              <div
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="300"
                data-aos-easing="ease-in-sine"
                className=" card-body grid grid-cols-3 px-5 items-center gap-4 "
              >
                <h3>Your Email:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={user.email || "< Private_Email >"}
                    className="input  input-bordered  input-md w-full max-w-xs "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-32 lg:right-5 xl:right-16 2xl:right-40" />
                </div>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="400"
                data-aos-easing="ease-in-sine"
                className="card-body grid grid-cols-3 px-5 items-center gap-4 "
              >
                <h3>Your Name:</h3>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={user.displayName}
                  className="input col-span-2 input-bordered  input-md w-full max-w-xs"
                />
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="500"
                data-aos-easing="ease-in-sine"
                className="card-body grid grid-cols-3  px-5 items-center gap-4"
              >
                <h3>Photo Url:</h3>

                <input
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder={user.photoURL}
                  className="input col-span-2 input-bordered  input-md w-full max-w-xs"
                />
              </div>
              <div className="card-body w-full md:w-[80%] mx-auto  px-5 items-center gap-4 mb-6">
                <button
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="800"
                  data-aos-easing="ease-in-sine"
                  disabled={btnDisabled}
                  type="submit"
                  className="btn btn-primary w-full border"
                >
                  {pageLoading && <SpinnerAtButton />}
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
