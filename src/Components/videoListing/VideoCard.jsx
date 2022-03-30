import "./videoListing.css";

export function VideoCard({ video }) {
  return (
    <div className="video-card card card-w-badge">
      <div className="card-image">
        <img alt={video.title} className="card-img" src={video.thumbnail} />
        <div className="product-rating">200 views</div>
      </div>

      <div className="card-header">
        <div className="card-title video-title">{video.title}</div>
      </div>
      <div className="card-footer">
        <p className="txt txt-gray video-title">by {video.creator}</p>

        <div className="action-icons">
          <button className="btn-icon btn-sm btn-outline-primary material-icons-outlined">
            thumb_up
          </button>
          <button className="btn-icon btn-sm btn-outline-primary material-icons-outlined">
            thumb_down
          </button>
          <button className="btn-icon btn-sm btn-outline-primary material-icons-outlined">
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
