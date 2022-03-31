import { Link } from "react-router-dom";
import "./sidenav.css";
export function SidenavItem({ item }) {
  return (
    <Link to={item.route} className="link">
      <i className="material-icons-outlined list-icon my-2">{item.iconName}</i>
      <p className="mb-2 txt-sm">{item.title}</p>
    </Link>
  );
}