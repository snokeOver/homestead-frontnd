import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialLinkedin,
} from "react-icons/ti";

const SocialLinks = () => {
  return (
    <nav>
      <div className="grid grid-flow-col gap-8">
        <a className="cursor-pointer">
          <TiSocialTwitter className="text-3xl" />
        </a>
        <a className="cursor-pointer">
          <TiSocialFacebook className="text-3xl" />
        </a>
        <a className="cursor-pointer">
          <TiSocialYoutube className="text-3xl" />
        </a>
        <a className="cursor-pointer">
          <TiSocialLinkedin className="text-3xl" />
        </a>
      </div>
    </nav>
  );
};

export default SocialLinks;
