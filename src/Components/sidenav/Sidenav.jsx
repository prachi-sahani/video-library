import { Link } from "react-router-dom";
import "./sidenav.css"
import "../../styles.css"
export function Sidenav() {
  return (
    <div className="sidenav py-4 px-2">
      <ul className="list-group-stacked">
        <Link to="/" className="link"><li className="list-item txt-center">
          <i className="material-icons-outlined list-icon">home</i>
          <p className="txt txt-sm">Home</p>
        </li></Link>
        <Link to="/explore" className="link"><li className="list-item txt-center">
          <i className="material-icons-outlined list-icon">explore</i>
          <p className="txt txt-sm">Explore</p>
        </li></Link>
        <Link to="/playlists" className="link"><li className="list-item txt-center">
          <i className="material-icons-outlined list-icon">library_music</i>
          <p className="txt txt-sm">Playlists</p>
        </li></Link>
        <Link to="/watchLater" className="link"><li className="list-item txt-center">
          <i className="material-icons-outlined list-icon">watch_later</i>
          <p className="txt txt-sm">Watch Later</p>
        </li></Link>
        <Link to="/likedVideos" className="link"><li className="list-item txt-center">
          <i className="material-icons-outlined list-icon">thumb_up</i>
          <p className="txt txt-sm">Liked Videos</p>
        </li></Link>
        <Link to="/history" className="link"><li className="list-item txt-center">
          <i className="material-icons list-icon">history</i>
          <p className="txt txt-sm">History</p>
        </li></Link>
      </ul>
    </div>
  );
}
