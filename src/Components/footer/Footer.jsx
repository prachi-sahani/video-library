import { Link } from "react-router-dom";
import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-upper">
        <ul className="footer-quick-links list-group txt-left">
          <h4 className="headings h4">Quick Links</h4>
          <Link to="/" className="link">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/" className="link">
            <li className="list-item">Terms & Conditions</li>
          </Link>
        </ul>
        <ul className="footer-contact-links list-group txt-left">
          <h4 className="headings h4">Get in touch</h4>
          <a className="link" href="tel:9999999999">
            <li className="list-item">
              <i className="material-icons txt-bold txt-md pr-2">phone</i>
              (+91) 9999999999
            </li>
          </a>
          <a className="link" href="mailto:support@caketube.com">
            <li className="list-item">
              <i className="material-icons pr-2">mail_outline</i>
              support@caketube.com
            </li>
          </a>
        </ul>
      </div>
      <div className="footer-lower mt-4 txt-sm">
        &copy; 2022 <strong>CakeTube</strong>. All rights reserved. Designed
        by <strong>Prachi Sahani</strong>
      </div>
    </footer>
  );
}
