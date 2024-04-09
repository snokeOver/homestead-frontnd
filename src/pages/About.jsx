import SocialLinks from "../components/sharedComponents/SocialLinks";

const About = () => {
  return (
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
            finding a home what’s outside the front door is just as important as
            what’s behind it.
          </h2>
          <p className="font-light text-gray-400">
            That’s why we go beyond the typical listings, by sourcing insights
            straight from locals and offering over 34 neighborhood map overlays,
            to give people a deeper understanding of what living in a home and
            neighborhood is really like.
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
      <div className="card card-side bg-base-200 shadow-xl flex flex-col xl:flex-row gap-6 lg:gap-0">
        <div className="card-body flex-1 flex flex-col gap-6">
          <div className="mb-2">
            <p className="font-semibold">Address:</p>
            <p>123 Main Street, Cityville, State, Country</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Phone:</p>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Email:</p>
            <p>info@example.com</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Hours:</p>
            <p>Monday - Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div className="flex items-center p-3 ">
          <img
            className="rounded-xl"
            src="https://i.ibb.co/JKD5rvZ/google-maps.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
