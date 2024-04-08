// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

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
  return (
    <div className="py-10 relative z-0">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
        effect={"cube"}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        className="mySwiper"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
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
          <h4 className="text-2xl lg:text-3xl xl:text-4xl text-gray-300 mb-3">
            THE BEST WAY TO
          </h4>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl text-gray-100">
            Find Your Perfect Home
          </h1>
        </div>
        <div className="w-[90%] lg:w-3/4 xl:w-1/2 mx-auto">
          <label className="input search_menu input-bordered w-full flex items-center gap-2">
            <ul className="menu menu-horizontal w-fit px-1">
              <li>
                <details>
                  <summary>Apartments</summary>
                  <ul className="p-2 w-44  bg-base-100 rounded-t-none">
                    <li>
                      <a>Single Family</a>
                    </li>
                    <li>
                      <a>Town House</a>
                    </li>
                    <li>
                      <a>Apartments</a>
                    </li>
                    <li>
                      <a>Student Housing</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <div className="divider divider-horizontal py-1"></div>
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Banner;
