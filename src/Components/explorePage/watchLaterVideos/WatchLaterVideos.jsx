import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { PlaylistMainSection } from "../playlistMainSection/PlaylistMainSection";
import { PlaylistVideoList } from "../playlistVideoList/PlaylistVideoList";
import "./watchLaterVideos.css";
import { getWatchLaterVideos } from "../../../utilities/server-request/server-request";
import { Loader } from "../../loader/Loader";

export function WatchLaterVideos() {
  const { dataState, dataDispatch } = useDBdata();
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      if (!dataState.watchLaterVideos) {
        (async () => {
          setLoading(true);
          const watchLaterVideosData = await getWatchLaterVideos(authToken);
          setLoading(false);
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideosData.data.watchlater,
          });
        })();
      }
    } else {
      localStorage.setItem("lastRoute", "/explore/watchLater");
      navigate("/login");
    }
  }, []);
  return (
    <div className="main-content">
      {loading && <Loader/>}
      {dataState.watchLaterVideos?.length >= 0 && (
        <PlaylistMainSection
          data={dataState.watchLaterVideos}
          pageTitle="Watch Later"
        />
      )}
      {dataState.watchLaterVideos?.length >= 0 && (
        <PlaylistVideoList data={dataState.watchLaterVideos} page="watchLater"/>
      )}
    </div>
  );
}
