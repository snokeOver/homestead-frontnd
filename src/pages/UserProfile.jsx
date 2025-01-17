import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  // fallback for Profile image to show default image
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  // convert timezone into local
  const convertTimezoneToLocal = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  };
  const createTime = convertTimezoneToLocal(user.metadata.creationTime);
  const logTime = convertTimezoneToLocal(user.metadata.lastSignInTime);

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  return (
    <>
      <Helmet>
        <title>Homestead | User Profile</title>
      </Helmet>
      <div className="my-10 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen w-full overflow-hidden">
        <div className="flex flex-col gap-6">
          <div className="card  w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
            <div className="card-body flex items-center ">
              <h2
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-sine"
                className="card-title text-2xl md:text-3xl"
              >
                Your Profile Details
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
          <div className="card card-compact mt-8 w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="300"
              data-aos-easing="ease-in-sine"
              className="card-body grid grid-cols-3 px-5 items-center gap-4 "
            >
              <h3>Your Name:</h3>
              <input
                readOnly
                type="text"
                placeholder={user.displayName}
                className="input col-span-2 input-bordered  input-md w-full max-w-xs"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="400"
              data-aos-easing="ease-in-sine"
              className="card-body grid grid-cols-3  px-5 items-center gap-4 "
            >
              <h3>Your Email:</h3>

              <input
                readOnly
                type="text"
                placeholder={user.email || "< Private_Email >"}
                className="input col-span-2 input-bordered  input-md w-full max-w-xs"
              />
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="500"
              data-aos-easing="ease-in-sine"
              className="card-body grid grid-cols-3  px-5 items-center gap-4 "
            >
              <h3>Your Photo URL:</h3>

              <input
                readOnly
                type="text"
                placeholder={user.photoURL}
                className="input col-span-2 input-bordered  input-md w-full max-w-xs"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="550"
              data-aos-easing="ease-in-sine"
              className="card-body grid grid-cols-3  px-5 items-center gap-4"
            >
              <h3>Email Verified Statues:</h3>

              <input
                readOnly
                type="text"
                placeholder={user.emailVerified ? "Verified" : "Not Vefied"}
                className="input col-span-2 input-bordered  input-md w-full max-w-xs"
              />
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="600"
              data-aos-easing="ease-in-sine"
              className="card-body grid grid-cols-3  px-5 items-center gap-4"
            >
              <h3>Registerd At:</h3>

              <input
                readOnly
                type="text"
                placeholder={createTime}
                className="input col-span-2 input-bordered  input-md w-full max-w-xs"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="650"
              data-aos-easing="ease-in-sine"
              className="card-body grid grid-cols-3  px-5 items-center gap-4 mb-8"
            >
              <h3>Last Login:</h3>

              <input
                readOnly
                type="text"
                placeholder={logTime}
                className="input col-span-2 input-bordered  input-md w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
