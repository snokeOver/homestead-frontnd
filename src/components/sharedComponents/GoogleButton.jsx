import { FaGoogle } from "react-icons/fa";
const GoogleButton = ({ text, handleBtn }) => {
  return (
    <button onClick={handleBtn} className="btn  btn-outline btn-info ">
      <FaGoogle />
      <span className="ml-1">{text}</span>
    </button>
  );
};

export default GoogleButton;
