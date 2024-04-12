const PartnerCard = ({ partner }) => {
  return (
    <div className="flex justify-center group-hover:scale-[0.8] hover:!scale-100 duration-500">
      <img className="w-48" src={partner.image} alt="" />
    </div>
  );
};

export default PartnerCard;
