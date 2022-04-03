import { useDBdata } from "../../../context/db-data-context";

export function VideoPreview({ currentVideo, videoID }) {
  const {
    getLikeStatusClassName,
    updateLikedVideo,
    getWatchLaterStatusClassName,
    updateWatchLaterVideo,
  } = useDBdata();
  return (
    <div className="p-3 full-video-view">
      <iframe
        width="100%"
        height="350px"
        allow="autoplay"
        src={`${currentVideo.url}?autoplay=1`}
        title={currentVideo.title}
        allowFullScreen
      ></iframe>
      <div className="video-basic-details">
        <div className="video-title-details my-2">
          <h3 className="heading h3 pt-2 ">{currentVideo.title}</h3>
          <p className="txt-gray txt-bold">By {currentVideo.creator}</p>
        </div>
        <div className="video-action-items">
          <button
            className={`btn-icon btn-outline-primary material-icons${getLikeStatusClassName(
              videoID
            )}`}
            onClick={() => updateLikedVideo(currentVideo, videoID)}
          >
            thumb_up
          </button>
          <button
            className={`btn-icon btn-outline-primary material-icons${getWatchLaterStatusClassName(
              videoID
            )}`}
            onClick={() => updateWatchLaterVideo(currentVideo, videoID)}
          >
            watch_later
          </button>
          <button className="btn-icon btn-outline-primary material-icons">
            playlist_add
          </button>
        </div>
      </div>
      <p className=" txt txt-gray mb-2">{currentVideo.description}</p>
    </div>
  );
}
