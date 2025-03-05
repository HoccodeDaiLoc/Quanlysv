import { Link } from "react-router-dom";
import style from "../styles/Footer.modules.scss";
import youtube from "../asset/image/youtube.svg";
import facebook from "../asset/image/facebook.svg";
import instagram from "../asset/image/instagram.svg";

function Footer() {
  return (
    <>
      <div className="footer_container">
        <div className="footer">
          <div className="left_nav">© 2024 Trọ việt, Inc.</div>
          <div className="right_nav">
            <a href={"https://www.facebook.com/"} className="icon_container">
              <img className="icon" src={facebook} alt="" />
            </a>
            <a href={"https://www.instagram.com/"} className="icon_container">
              <img className="icon" src={instagram} alt="" />
            </a>
            <a href={"https://www.youtube.com/"} className="icon_container">
              <img className="icon youtube" src={youtube} alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
