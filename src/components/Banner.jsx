// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosSearch } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";

const Banner = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("/sliderImages.json")
      .then((result) => result.json())
      .then((images) => setImages(images));
  }, []);

  // Manage the search functionality
  const handleSearchButton = (e) => {
    e.preventDefault();
  };

  return (
    <div className="py-10 relative z-0">
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectCube,
          Autoplay,
        ]}
        effect={"cube"}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // autoplay
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-30"></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-8 lg:gap-16 w-[90%]">
        <div className="text-center">
          <h4
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 mb-3"
          >
            THE BEST WAY TO
          </h4>
          <h1
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
            className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-gray-100"
          >
            Find Your Perfect Home
          </h1>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="1000"
          className="w-[80%] lg:w-3/4 xl:w-1/2 mx-auto "
        >
          <form onSubmit={handleSearchButton}>
            <fieldset className="form-control w-full">
              <div className="join relative">
                <input
                  type="text"
                  placeholder="Search . . . "
                  className="input input-bordered join-item text-xs w-full"
                />
                <IoIosSearch className="absolute right-24 lg:right-28 top-4" />
                <button type="submit" className="btn btn-primary join-item">
                  Search
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
