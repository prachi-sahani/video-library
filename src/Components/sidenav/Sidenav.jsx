import "./sidenav.css";
import "../../styles.css";
import { SidenavItem } from "./SidenavItem";
import { sidenavItemList } from "./sidenavItemList";
export function Sidenav() {
  return (
    <div className="sidenav px-2">
      <ul className="list-group-stacked">
        {sidenavItemList.map((item) => (
          <SidenavItem key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
}
