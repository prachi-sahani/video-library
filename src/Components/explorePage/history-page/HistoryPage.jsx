import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { getHistory } from "../../../utilities/server-request/server-request";
import { PlaylistMainSection } from "../playlistMainSection/PlaylistMainSection";
import { PlaylistVideoList } from "../playlistVideoList/PlaylistVideoList";
import "./historyPage.css";
import { Loader } from "../../loader/Loader";
import { ErrorPage } from "../../errorPage/ErrorPage";

export function HistoryVideos() {
  const { authToken } = useAuth();
  const { dataState, dataDispatch } = useDBdata();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dataState.historyVideos) {
      (async () => {
        try {
          setLoading(true);
          const historyVideosData = await getHistory(authToken);
          setLoading(false);
          dataDispatch({
            type: "HISTORY_VIDEOS",
            payload: historyVideosData.data.history,
          });
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      })();
    }
  }, []);
  return (
    <div className="main-content">
      {loading && <Loader />}
      {error && <ErrorPage />}
      {dataState.historyVideos?.length >= 0 && (
        <PlaylistMainSection
          data={dataState.historyVideos}
          pageTitle="Watch History"
        />
      )}
      {dataState.historyVideos?.length >= 0 && (
        <PlaylistVideoList data={dataState.historyVideos} />
      )}
    </div>
  );
}
