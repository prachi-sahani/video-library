import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { removeFromLikedVideo, removeFromWatchLaterVideo } from "../../../utilities/server-request/server-request";
import "./playlistVideoList.css";

export function PlaylistVideoList({data}) {
  const {pathname} = useLocation()
  const { authToken } = useAuth();
  const { dataDispatch } = useDBdata();

  async function deleteItem(id){
    if(pathname.includes("watchLater")){
      const watchLaterVideoData = await removeFromWatchLaterVideo(authToken, id);
      console.log( watchLaterVideoData.data.watchlater);
      dataDispatch({type: "WATCH_LATER_VIDEOS", payload: watchLaterVideoData.data.watchlater})
    }
    else if(pathname.includes("likedVideos")){
      const likedVideoData = await removeFromLikedVideo(authToken, id);
      dataDispatch({type: "LIKED_VIDEOS", payload: likedVideoData.data.likes})
    }
  }

  return (
    <div className="video-list-section">
      {
        data.length === 0 && <p className="txt-gray txt-bold txt-md txt-center my-4">No videos added</p>
      }
      <ul className="list-group-stacked list ">
        {data.map((item) => (
          <li key={item._id} className="list-item video-item ">
            <img
              className="video-thumbnail"
              src={`/${item.thumbnail}`}
              alt={item.title}
            />
            <div className="video-content ">
              <p className="txt-bold list-title">{item.title}</p>
              <p className="txt txt-gray">By {item.creator}</p>
            </div>
            <div className="action-button">
              <button className="btn-icon action-icon material-icons" onClick={() => deleteItem(item._id)}>
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
