import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { getHistory } from "../../../utilities/server-request/server-request";
import { PlaylistMainSection } from "../playlistMainSection/PlaylistMainSection";
import { PlaylistVideoList } from "../playlistVideoList/PlaylistVideoList";
import "./historyPage.css";
import { Loader } from "../../loader/Loader";

export function HistoryVideos() {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { dataState, dataDispatch } = useDBdata();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authToken) {
      if (!dataState.historyVideos) {
        (async () => {
          setLoading(true)
          const historyVideosData = await getHistory(authToken);
          setLoading(false)
          dataDispatch({
            type: "HISTORY_VIDEOS",
            payload: historyVideosData.data.history,
          });
        })();
      }
    } else {
      localStorage.setItem("lastRoute", "/explore/history");
      navigate("/login");
    }
  }, []);
  return (
    <div className="main-content">
      {loading && <Loader/>}
      {dataState.historyVideos?.length >= 0 && (
        <PlaylistMainSection
          data={dataState.historyVideos}
          pageTitle="Watch History"
        />
      )}
      {dataState.historyVideos?.length >= 0 && (
        <PlaylistVideoList data={dataState.historyVideos}  />
      )}
    </div>
  );
}
