import { Helmet } from "react-helmet-async";
import SocialLinks from "../components/sharedComponents/SocialLinks";
import CustomMap from "../components/CustomMap";
import OfficeLocations from "../components/officeLocations/OfficeLocations";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Homestead | About</title>
      </Helmet>
      <div className="my-10 container bg-base-100 mx-auto p-5 md:p-10 min-h-screen">
        <div className="my-10">
          <h3 className="text-3xl font-semibold mb-5">Homestead History</h3>
        </div>
        <div className="card card-side bg-base-200 shadow-xl flex flex-col xl:flex-row gap-6 lg:gap-0">
          <figure className="flex-1 p-3">
            <img
              className="rounded-2xl"
              src="https://i.ibb.co/8xRj4Rf/about-page.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body flex-1 flex flex-col items-center justify-center gap-6">
            <h2 className="card-title">
              At Property Real Estate Company, we believe that when it comes to
              finding a home what’s outside the front door is just as important
              as what’s behind it.
            </h2>
            <p className="font-light text-gray-400">
              That’s why we go beyond the typical listings, by sourcing insights
              straight from locals and offering over 34 neighborhood map
              overlays, to give people a deeper understanding of what living in
              a home and neighborhood is really like.
            </p>
            <p className="font-light text-gray-400">
              We’re committed to helping them discover a place where they will
              love to live and where they will feel more connected to the
              community and to each other. It’s why we strive every day to help
              build a more neighborly world.
            </p>
            <div className="card-actions justify-end flex flex-col items-center gap-4">
              <h4 className="text-xl font-semibold ">Follow Us on: </h4>
              <SocialLinks />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-5 my-10">Office Location</h3>
        </div>
        <div className="card  bg-base-200 shadow-xl grid grid-cols-1 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <OfficeLocations />
          </div>
          <div className=" xl:col-span-3 bg-base-200 shadow-xl mx-3  min-h-96 grid items-center ">
            <CustomMap />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
