import { NavLink } from "react-router-dom";
import "./sidenav.css";
export function SidenavItem({ item }) {
  return (
    <NavLink end={true} to={item.route} className={({isActive}) => isActive ? "link txt-primary" : "link"}>
      <li className="list-item txt-center">
        <i className="material-icons-outlined list-icon my-2">
          {item.iconName}
        </i>
        <p className="mb-2 txt-sm">{item.title}</p>
      </li>
    </NavLink>
  );
}
