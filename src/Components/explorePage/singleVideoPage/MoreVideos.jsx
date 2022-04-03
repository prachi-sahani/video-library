import { Link } from "react-router-dom";

export function MoreVideos({ videos }) {
  return (
    <div className="more-videos py-3">
      <ul className="list-group-stacked list">
        {videos?.map((item) => (
          <Link key={item._id} to={`/explore/video/${item._id}`}>
            <li className="list-item video-list-item">
              <img
                className="video-list-thumbnail"
                src={`/${item.thumbnail}`}
                alt={item.title}
              />
              <div className="">
                <p className="txt-bold list-title">{item.title}</p>
                <p className="txt txt-sm txt-gray">By {item.creator}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <Link to="/explore">
        <p className="txt-right txt-bold px-4 my-1">View All</p>
      </Link>
    </div>
  );
}
