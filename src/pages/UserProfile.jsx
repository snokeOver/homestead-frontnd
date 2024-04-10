import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  return (
    <div className="my-10 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
      <div className="my-10 flex flex-col gap-6">
        <div className="card  w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
          <div className="card-body flex items-center ">
            <h2 className="card-title">Your Profile Details</h2>
            <div className="w-28 h-28">
              <img
                className="rounded-xl"
                alt="User Photo"
                src={user?.photoURL}
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
        <div className="card card-compact mt-8 w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
          <div className="card-body grid grid-cols-3 px-5 items-center gap-4 ">
            <h3>Your Name:</h3>
            <input
              readOnly
              type="text"
              placeholder={user.displayName}
              className="input col-span-2 input-bordered  input-md w-full max-w-xs"
            />
          </div>
          <div className="card-body grid grid-cols-3  px-5 items-center gap-4 ">
            <h3>Your Email:</h3>

            <input
              readOnly
              type="text"
              placeholder={user.email}
              className="input col-span-2 input-bordered  input-md w-full max-w-xs"
            />
          </div>
          <div className="card-body grid grid-cols-3  px-5 items-center gap-4 ">
            <h3>Your Photo URL:</h3>

            <input
              readOnly
              type="text"
              placeholder={user.photoURL}
              className="input col-span-2 input-bordered  input-md w-full max-w-xs"
            />
          </div>
          <div className="card-body grid grid-cols-3  px-5 items-center gap-4">
            <h3>Email Verified Statues:</h3>

            <input
              readOnly
              type="text"
              placeholder={user.emailVerified ? "Verified" : "Not Vefied"}
              className="input col-span-2 input-bordered  input-md w-full max-w-xs"
            />
          </div>
          <div className="card-body grid grid-cols-3  px-5 items-center gap-4">
            <h3>Registerd At:</h3>

            <input
              readOnly
              type="text"
              placeholder={user.metadata.creationTime}
              className="input col-span-2 input-bordered  input-md w-full max-w-xs"
            />
          </div>
          <div className="card-body grid grid-cols-3  px-5 items-center gap-4 mb-8">
            <h3>Last Login:</h3>

            <input
              readOnly
              type="text"
              placeholder={user.metadata.lastSignInTime}
              className="input col-span-2 input-bordered  input-md w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
