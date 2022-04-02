import { Link } from "react-router-dom";
import { useAuth } from "../../context/authorization-context";
import "../../styles.css";
import "./navbar.css";
export function Navbar() {
  const { authToken, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="navbar">
        <Link className="link" to="/">
          <img
            className="navbar-brand logo"
            src="/assets/logo.png"
            alt="CakeTube"
          ></img>
        </Link>
        <div className="navbar-nav">
          <ul className="list-group-inline navbar-nav-list">
            <Link className="link" to="/">
              <li className="txt-primary list-item">Home</li>
            </Link>
            <Link className="link" to="/explore">
              <li className="txt-primary list-item">Explore</li>
            </Link>
          </ul>
          <div className="navbar-action">
            {authToken ? (
              <button className="btn-basic btn-primary btn-sm link" onClick={logout}>
                LOGOUT
              </button>
            ) : (
              <Link to="/login" className="btn-basic btn-primary btn-sm link">
                LOGIN/SIGNUP
              </Link>
            )}
          </div>
        </div>
        <div className="navbar-menu">
          <button className="navbar-menu-btn btn-basic btn-outline-primary material-icons btn-md">
            menu
          </button>
          <ul className="navbar-menu-list list-group-stacked">
            <Link className="link" to="/">
              <li className="txt-primary list-item">Signup/Login </li>
            </Link>
            <Link className="link" to="/">
              <li className="txt-primary list-item">Account</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
