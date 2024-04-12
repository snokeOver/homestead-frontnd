import { useEffect, useState } from "react";
import ChooseUsCard from "./ChooseUsCard";

const ChooseUs = () => {
  const [chooseReasons, setChooseReasons] = useState([]);

  useEffect(() => {
    fetch("/chooseReason.json")
      .then((result) => result.json())
      .then((data) => setChooseReasons(data));
  }, []);
  return (
    <div className="py-10">
      <div
        id="choose_us_img"
        className="relative bg-cover h-[720px] bg-no-repeat  flex flex-col items-center text-center justify-center gap-1 md:gap-3 lg:gap-10"
      >
        <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-100">
          Why Choose Us
        </h1>
        <div className="p-3 md:py-14 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 px-5 lg:px-10 group">
            {chooseReasons.map((reason, index) => (
              <ChooseUsCard key={reason.id} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
