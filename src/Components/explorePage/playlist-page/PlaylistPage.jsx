import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { getPlaylists } from "../../../utilities/server-request/server-request";
import { ErrorPage } from "../../errorPage/ErrorPage";
import { Loader } from "../../loader/Loader";
import "./playlistPage.css";
export function PlaylistPage() {
  const { authToken } = useAuth();
  const { dataState, dataDispatch } = useDBdata();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authToken) {
      if (!dataState.playlists) {
        (async () => {
          try{
            setLoading(true);
            const playlistsData = await getPlaylists(authToken);
            setLoading(false);
            dataDispatch({
              type: "PLAYLISTS",
              payload: playlistsData.data.playlists,
            });
          }
          catch(err){
            setLoading(false);
            setError(true)
          }
        
        })();
      }
    } else {
      localStorage.setItem("lastRoute", "/explore/playlists");
      navigate("/login");
    }
  }, []);
  return (
    <div className="playlist-page m-3">
      {/*
      // will add this feature later
       <div className="playlist-card card card-basic">
        <div className="card-title">
          <i className="material-icons">add</i>Create Playlist
        </div>
      </div> */}

      {loading && <Loader />}
      {error && <ErrorPage />}
      {dataState.playlists && <Link
        to="/explore/playlists/watchLater"
        key="watchLater"
        className="playlist-card card card-basic"
      >
        <div className="card-title">Watch Later</div>
      </Link>}
      {dataState.playlists?.map((item) => (
        <Link
          to={`/explore/playlists/${item._id}`}
          key={item._id}
          className="playlist-card card card-basic"
        >
          <div className="card-title">{item.title}</div>
        </Link>
      ))}
    </div>
  );
}
