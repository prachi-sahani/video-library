import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { useMessageHandling } from "../../../context/message-handling";
import {
  removeFromHistory,
  removeFromLikedVideo,
  removeFromWatchLaterVideo,
  removeVideoFromPlaylist,
} from "../../../utilities/server-request/server-request";
import "./playlistVideoList.css";

export function PlaylistVideoList({ data }) {
  const { pathname } = useLocation();
  const { playlistID } = useParams();
  const { authToken } = useAuth();
  const { dataState, dataDispatch } = useDBdata();
  const { showSnackbar } = useMessageHandling();
  async function deleteItem(id) {
    try {
      if (pathname.includes("watchLater")) {
        const watchLaterVideoData = await removeFromWatchLaterVideo(
          authToken,
          id
        );
        showSnackbar(watchLaterVideoData.data.message);
        dataDispatch({
          type: "WATCH_LATER_VIDEOS",
          payload: watchLaterVideoData.data.watchlater,
        });
      } else if (pathname.includes("likedVideos")) {
        const likedVideoData = await removeFromLikedVideo(authToken, id);
        showSnackbar(likedVideoData.data.message);
        dataDispatch({
          type: "LIKED_VIDEOS",
          payload: likedVideoData.data.likes,
        });
      } else if (pathname.includes("history")) {
        const historyData = await removeFromHistory(authToken, id);
        showSnackbar(historyData.data.message);
        dataDispatch({
          type: "HISTORY_VIDEOS",
          payload: [...historyData.data.history].reverse(),
        });
      } else {
        // for user playlists
        const playlistData = await removeVideoFromPlaylist(
          authToken,
          playlistID,
          id
        );
        showSnackbar(playlistData.data.message);
        dataDispatch({
          type: "PLAYLISTS",
          payload: dataState.playlists.map((item) =>
            item._id === playlistID ? playlistData.data.playlist : item
          ),
        });
      }
    } catch (err) {
      showSnackbar("Some error occurred. Try Again!");
    }
  }

  return (
    <div className="video-list-section">
      {data.length === 0 && (
        <p className="txt-gray txt-bold txt-md txt-center my-4">
          No videos added
        </p>
      )}
      <ul className="list-group-stacked list ">
        {data.map((item) => (
          <li key={item._id} className="list-item video-item ">
            <Link to={`/explore/video/${item._id}`}>
              <img
                className="video-thumbnail"
                src={`/${item.thumbnail}`}
                alt={item.title}
              />
            </Link>
            <Link to={`/explore/video/${item._id}`} className="video-content">
              <p className="txt-bold list-title">{item.title}</p>
              <p className="txt txt-gray">By {item.creator}</p>
            </Link>
            <div className="action-button">
              <button
                className="btn-icon action-icon material-icons"
                onClick={() => deleteItem(item._id)}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
