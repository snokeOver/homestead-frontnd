const PartnerCard = ({ partner, index }) => {
  return (
    <div
      data-aos={index % 2 === 0 ? "fade-down" : "fade-up"}
      data-aos-duration="700"
      data-aos-delay="200"
      data-aos-easing="ease-in-sine"
    >
      <div className="flex justify-center group-hover:scale-[0.8] hover:!scale-100 duration-500">
        <img className="w-48" src={partner.image} alt="" />
      </div>
    </div>
  );
};

export default PartnerCard;
