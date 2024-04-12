import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialLinkedin,
} from "react-icons/ti";

const SocialLinks = () => {
  return (
    <nav>
      <div className="grid grid-flow-col gap-8 group">
        <a className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
          <TiSocialTwitter className="text-3xl" />
        </a>
        <a className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
          <TiSocialFacebook className="text-3xl" />
        </a>
        <a className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
          <TiSocialYoutube className="text-3xl" />
        </a>
        <a className="cursor-pointer group-hover:scale-[0.8] hover:!scale-100 duration-500">
          <TiSocialLinkedin className="text-3xl" />
        </a>
      </div>
    </nav>
  );
};

export default SocialLinks;
