import { useLocation } from "react-router-dom";
import { clearAllHistory, removeFromHistory } from "../../../utilities/server-request/server-request";
import { useAuth } from "../../../context/authorization-context";
import "./playlistMainSection.css";
import { useState } from "react";
import { useDBdata } from "../../../context/db-data-context";
export function PlaylistMainSection({data, pageTitle}) {
  const { pathname } = useLocation();
  const { authToken } = useAuth()
  const{ dataDispatch } = useDBdata()
  const[clearHistoryText, setClearHistoryText] = useState("Clear History")
  
  async function clearHistory(){
    setClearHistoryText("Clearing...")
    const historyData = await clearAllHistory(authToken);
    dataDispatch({
      type: "HISTORY_VIDEOS",
      payload: historyData.data.history
    });
    setClearHistoryText("Clear History")
  }

  return (
    <div className="content-details-section p-3">
      <img
        className="video-preview p-2"
        src={data.length ? `/${data[0]?.thumbnail}` : "/assets/no-video-image.png"}
        alt={data[0]?.title}
      />
      <div className="page-title">
        <h3 className="heading h3 p-2">{pageTitle}</h3>
        {pathname.includes("playlists") && (
          <div className="action-buttons mb-1">
            <button className="btn-icon material-icons action-icon">
              edit
            </button>
            <button className="btn-icon material-icons action-icon">
              delete
            </button>
          </div>
        )}

        {pathname.includes("history") && data.length>0 && (
        <button className="btn-basic btn-outline-basic btn-sm" disabled={clearHistoryText==="Clearing..."} onClick={clearHistory}>{clearHistoryText}</button>
        )}
      </div>
      <p className="px-2">{data.length} videos</p>
    </div>
  );
}
