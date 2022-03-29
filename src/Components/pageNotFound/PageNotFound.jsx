import { Link } from "react-router-dom";
import "./pageNotFound.css";

export function PageNotFound() {
  return (
    <div className="pageNotFound my-5 heading h2 txt-center">
      <p className="my-2 txt-gray">
        <span className="txt-primary">OOPS!</span> Page not found<br/>
        <Link to="/">
          <span className="txt-primary">Go to Home</span>
        </Link>
      </p>
    </div>
  );
}
