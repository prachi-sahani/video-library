import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import {
  addToLikedVideo,
  addToWatchLaterVideo,
  removeFromLikedVideo,
  removeFromWatchLaterVideo,
} from "../../../utilities/server-request/server-request";
import "./videoListing.css";
import { useMessageHandling } from "../../../context/message-handling";

export function VideoCard({ video, setShowPlaylistDialog, setVideoSelected }) {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { dataState, dataDispatch } = useDBdata();
  const { showSnackbar } = useMessageHandling();
  const isVideoLiked =
    dataState.likedVideos?.findIndex((item) => item._id === video._id) >= 0;
  const isVideoWatchLater =
    dataState.watchLaterVideos?.findIndex((item) => item._id === video._id) >=
    0;
  async function updateLikedVideo(data) {
    if (authToken) {
      try {
        if (isVideoLiked) {
          const likedVideoData = await removeFromLikedVideo(
            authToken,
            data._id
          );
          showSnackbar(likedVideoData.data.message);
          dataDispatch({
            type: "LIKED_VIDEOS",
            payload: likedVideoData.data.likes,
          });
        } else {
          const likedVideoData = await addToLikedVideo(authToken, data);
          showSnackbar(likedVideoData.data.message);
          dataDispatch({
            type: "LIKED_VIDEOS",
            payload: likedVideoData.data.likes,
          });
        }
      } catch (err) {
        showSnackbar("Some error occurred. Try again!");
      }
    } else {
      navigate("/login",{state:{from:location}});

    }
  }

  async function updateWatchLaterVideo(data) {
    if (authToken) {
      try {
        if (isVideoWatchLater) {
          const watchLaterVideoData = await removeFromWatchLaterVideo(
            authToken,
            data._id
          );
          showSnackbar(watchLaterVideoData.data.message);
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideoData.data.watchlater,
          });
        } else {
          const watchLaterVideoData = await addToWatchLaterVideo(
            authToken,
            data
          );
          showSnackbar(watchLaterVideoData.data.message);
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideoData.data.watchlater,
          });
        }
      } catch (err) {
        showSnackbar("Some error occurred. Try again!");
      }
    } else {
      navigate("/login",{state:{from:location}});

    }
  }

  async function openPlaylistDialog(data) {
    if (authToken) {
      setVideoSelected(data);
      setShowPlaylistDialog(true);
    } else {
      navigate("/login",{state:{from:location}});

    }
  }

  function getLikeStatusClassName() {
    return isVideoLiked && authToken ? "" : "-outlined";
  }
  function getWatchLaterStatusClassName() {
    return isVideoWatchLater && authToken ? "" : "-outlined";
  }
  return (
    <div className="video-card card card-w-badge">
      <Link className="card-image" to={`/explore/video/${video._id}`}>
        <img loading="lazy"  alt={video.title} className="card-img" src={video.thumbnail} />
        {/* <div className="product-rating">200 views</div> */}
      </Link>

      <div className="card-header">
        <div className="card-title video-title">{video.title}</div>
      </div>
      <div className="card-footer">
        <p className="txt txt-gray video-title">by {video.creator}</p>

        <div className="action-icons">
          <button
            className={`btn-icon btn-sm btn-outline-primary material-icons${getLikeStatusClassName()}`}
            onClick={() => updateLikedVideo(video)}
          >
            thumb_up
          </button>

          <button
            className={`btn-icon btn-sm btn-outline-primary material-icons${getWatchLaterStatusClassName()}`}
            onClick={() => updateWatchLaterVideo(video)}
          >
            watch_later
          </button>
          <button
            className="btn-icon btn-sm btn-outline-primary material-icons-outlined"
            onClick={() => openPlaylistDialog(video)}
          >
            playlist_add
          </button>
        </div>
      </div>
    </div>
  );
}
