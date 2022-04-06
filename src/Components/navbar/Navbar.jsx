import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authorization-context";
import { useMessageHandling } from "../../context/message-handling";
import "../../styles.css";
import { SidenavSmallScreen } from "../sideNavSmallScreen/SidenavSmallScreen";
import "./navbar.css";

export function Navbar() {
  const { authToken, logout } = useAuth();
  const { showSidenav, setShowSidenav } = useMessageHandling();
  return (
    <nav className="nav">
      <div className="navbar">
        {/* for screens less than 600px */}
        <button
          className=" btn-nav-small btn-icon btn-outline-primary mr-2 material-icons"
          onClick={() => setShowSidenav((value) => !value)}
        >
          {showSidenav ? "menu_open" : "menu"}
        </button>

        <Link className="link" to="/">
          <img
            className="navbar-brand logo"
            src="/assets/logo.png"
            alt="CakeTube"
          ></img>
        </Link>
        <div className="navbar-nav">
          <ul className="list-group-inline navbar-nav-list">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "txt-bold link " : "link"
              }
            >
              <li className="txt-primary list-item">Home</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "txt-bold link " : "link"
              }
              to="/explore"
            >
              <li className="txt-primary list-item">Explore</li>
            </NavLink>
          </ul>
          <div className="navbar-action">
            {authToken ? (
              <button
                className="btn-basic btn-primary btn-sm link"
                onClick={logout}
              >
                LOGOUT
              </button>
            ) : (
              <Link to="/login" className="btn-basic btn-primary btn-sm link">
                LOGIN/SIGNUP
              </Link>
            )}
          </div>
        </div>
       
      </div>
      {/* for screens less than 600px */}
      {showSidenav && <SidenavSmallScreen />}
    </nav>
  );
}
