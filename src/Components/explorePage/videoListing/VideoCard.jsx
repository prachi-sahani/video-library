import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { addToLikedVideo, addToWatchLaterVideo, removeFromLikedVideo, removeFromWatchLaterVideo } from "../../../utilities/server-request/server-request";
import "./videoListing.css";

export function VideoCard({ video }) {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { dataState, dataDispatch} = useDBdata();
  const isVideoLiked = dataState.likedVideos?.findIndex(item => item._id === video._id) >= 0
  const isVideoWatchLater = dataState.watchLaterVideos?.findIndex(item => item._id === video._id) >= 0
  async function updateLikedVideo(data){
    if(authToken){
      if(isVideoLiked){
        const likedVideoData = await removeFromLikedVideo(authToken, data._id);
        dataDispatch({type: "LIKED_VIDEOS", payload: likedVideoData.data.likes})
      }
      else{
        const likedVideoData = await addToLikedVideo(authToken, data);
        dataDispatch({type: "LIKED_VIDEOS", payload: likedVideoData.data.likes})
      }
  
    }
    else{
      localStorage.setItem("lastRoute", "/explore");
      navigate("/login")
    }
  }

  async function updateWatchLaterVideo(data){
    if(authToken){
      if(isVideoWatchLater){
        const watchLaterVideoData = await removeFromWatchLaterVideo(authToken, data._id);
        dataDispatch({type: "WATCH_LATER_VIDEOS", payload: watchLaterVideoData.data.watchlater})
      }
      else{
        const watchLaterVideoData = await addToWatchLaterVideo(authToken, data);
        dataDispatch({type: "WATCH_LATER_VIDEOS", payload: watchLaterVideoData.data.watchlater})
      }
  
    }
    else{
      localStorage.setItem("lastRoute", "/explore");
      navigate("/login")
    }
  }

  function getLikeStatusClassName(){
    return isVideoLiked && authToken ? "" : "-outlined" ;
  }
  function getWatchLaterStatusClassName(){
    return isVideoWatchLater && authToken ? "" : "-outlined" ;
  }
  return (
    <div className="video-card card card-w-badge">
      <Link className="card-image" to={`/explore/video/${video._id}`}>
        <img alt={video.title} className="card-img" src={video.thumbnail} />
        <div className="product-rating">200 views</div>
      </Link>

      <div className="card-header">
        <div className="card-title video-title">{video.title}</div>
      </div>
      <div className="card-footer">
        <p className="txt txt-gray video-title">by {video.creator}</p>

        <div className="action-icons">
          <button className={`btn-icon btn-sm btn-outline-primary material-icons${getLikeStatusClassName()}`} onClick={() => updateLikedVideo(video)}>
            thumb_up
          </button>
          {/* <button className="btn-icon btn-sm btn-outline-primary material-icons-outlined">
            thumb_down
          </button> */}
          <button className={`btn-icon btn-sm btn-outline-primary material-icons${getWatchLaterStatusClassName()}`} onClick={() => updateWatchLaterVideo(video)}>
            watch_later
          </button>
        </div>
        {/* <button className="btn-basic btn-primary w-100 btn-watch-now">
            Watch Now
          </button> */}
      </div>
    </div>
  );
}
