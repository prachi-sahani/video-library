import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { getLikedVideos } from "../../../utilities/server-request/server-request";
import { PlaylistMainSection } from "../playlistMainSection/PlaylistMainSection";
import { PlaylistVideoList } from "../playlistVideoList/PlaylistVideoList";
import "./likedVideos.css";
import { Loader } from "../../loader/Loader";
import {ErrorPage} from "../../errorPage/ErrorPage"

export function LikedVideos() {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { dataState, dataDispatch } = useDBdata();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    if (authToken) {
      if (!dataState.likedVideos) {
        (async () => {
          try{
            setLoading(true)
            const likedVideosData = await getLikedVideos(authToken);
            setLoading(false)
            dataDispatch({
              type: "LIKED_VIDEOS",
              payload: likedVideosData.data.likes,
            });
          }
          catch(err){
              setLoading(false);
              setError(true)
          }
        
        })();
      }
    } else {
      localStorage.setItem("lastRoute", "/explore/likedVideos");
      navigate("/login");
    }
  }, []);
  return (
    <div className="main-content">
      {loading && <Loader/>}
      {error && <ErrorPage/>}
      {dataState.likedVideos?.length >= 0 && (
        <PlaylistMainSection
          data={dataState.likedVideos}
          pageTitle="Liked Videos"
        />
      )}
      {dataState.likedVideos?.length >= 0 && (
        <PlaylistVideoList data={dataState.likedVideos}  />
      )}
    </div>
  );
}
