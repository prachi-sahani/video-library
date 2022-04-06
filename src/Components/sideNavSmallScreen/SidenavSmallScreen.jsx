import { NavLink } from "react-router-dom";
import { useMessageHandling } from "../../context/message-handling";
import { sidenavItemList } from "../sidenav/sidenavItemList";
import "./sidenavSmallScreen.css";
export function SidenavSmallScreen() {
    const { setShowSidenav } =useMessageHandling()
  return (
    <aside className="sidenav-sm">
      <ul>
        <ul className="list-group-stacked">
          {sidenavItemList.map((item) => (
            <NavLink end={true} to={item.route} key={item.title}   className={({ isActive }) =>
            isActive ? "txt-primary" : ""} onClick={() =>setShowSidenav(false)}>
              <li className="list-item list-w-icon">
                <i className="material-icons list-icon">{item.iconName}</i>
                {item.title}
              </li>
            </NavLink>
          ))}
        </ul>
      </ul>
    </aside>
  );
}
