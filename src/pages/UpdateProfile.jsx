import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinnerAtButton from "../components/sharedComponents/SpinnerAtButton";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
  const { user, updateProfileInfo } = useContext(AuthContext);
  const [pageLoading, setPageLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");

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
        setUpdateMsg("Profile Updated Successfully!");
        setPageLoading(false);
      })
      .catch((err) => {
        setFirebaseError(err.code);
        setUpdateMsg("");
        setPageLoading(false);
      });
  };

  useEffect(() => {
    if (firebaseError) {
      toast(firebaseError);
      setFirebaseError("");
    }
    if (updateMsg) {
      toast(updateMsg);
      setUpdateMsg("");
    }
  }, [firebaseError, updateMsg]);

  return (
    <>
      <Helmet>
        <title>Homestead | Update Profile</title>
      </Helmet>
      <div className="my-10 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="my-10 flex flex-col gap-6">
          <div className="card  w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
            <div className="card-body flex items-center ">
              <h2 className="card-title text-3xl">Update Your Profile</h2>
              <div className="w-48 mt-5">
                <img
                  className="rounded-xl"
                  alt="User Photo"
                  src={user?.photoURL}
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <div className="card card-compact mt-8 w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
              <div className="card-body grid grid-cols-3 px-5 items-center gap-4 ">
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

              <div className="card-body grid grid-cols-3  px-5 items-center gap-4">
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
                <button type="submit" className="btn btn-primary w-full border">
                  {pageLoading && <SpinnerAtButton />}
                  Update
                </button>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
