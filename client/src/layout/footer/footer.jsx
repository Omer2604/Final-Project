import "../../css/Footer.css";
import React from "react";

const Footer = () => {
  return (
    <ul className="copyrights">
      All the rights recived to Eden Cakes &copy; {new Date().getFullYear()}
      <img className="logoFooter" src="/assets/images/icon.jpg" alt="icon" />
      <hr />
      <a
        href="https://www.instagram.com/edenn_cakes/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="instagram"
          src="/assets/images/instagram.jpg"
          alt="instgram"
        />
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=509243097"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="whatsapp"
          src="/assets/images/whatsapp.png"
          alt="whatsapp"
        />
      </a>
      <a href="tel:+972509243097">
        <img className="phone" src="/assets/images/phone.png" alt="tel" />
      </a>
      <a href="mailto:eden199974@gmail.com">
        <img className="email" src="/assets/images/email.png" alt="email" />
      </a>
    </ul>
  );
};

export default Footer;
