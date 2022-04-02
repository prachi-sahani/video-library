import { useLocation } from "react-router-dom";
import "./playlistMainSection.css";
export function PlaylistMainSection({data, pageTitle}) {
  const { pathname } = useLocation();
  return (
    <div className="content-details-section p-3">
      <img
        className="video-preview p-2"
        src={data.length ? `/${data[0]?.thumbnail}` : "/assets/no-video-image.png"}
        alt={data[0]?.title}
      />
      <div className="page-title">
        <h3 className="heading h3 p-2">{pageTitle}</h3>
        {pathname.includes("playlists") && (
          <div className="action-buttons mb-1">
            <button className="btn-icon material-icons action-icon">
              edit
            </button>
            <button className="btn-icon material-icons action-icon">
              delete
            </button>
          </div>
        )}
      </div>
      <p className="px-2">{data.length} videos</p>
    </div>
  );
}
