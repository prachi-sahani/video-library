import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDBdata } from "../../../context/db-data-context";
import {
  getVideos
} from "../../../utilities/server-request/server-request";
import "./singleVideoPage.css";
import { MoreVideos } from "./MoreVideos";
import { VideoPreview } from "./VideoPreview";
import { Loader } from "../../loader/Loader";
import { useAuth } from "../../../context/authorization-context";
import { ErrorPage } from "../../errorPage/ErrorPage";

export function SingleVideoPage() {
  const { videoID } = useParams();
  const { authToken } = useAuth();
  const { dataState, dataDispatch, addVideoToHistory } = useDBdata();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataState.videos.length === 0) {
      (async () => {
        try{
          setLoading(true);
          const videoListData = await getVideos();
          const videoData = videoListData.data.videos.find(
            (item) => item._id === videoID
          );
          setCurrentVideo(videoData);
          dataDispatch({ type: "VIDEOS", payload: videoListData.data.videos });
          if (authToken) {
            addVideoToHistory(videoData);
          }
          setLoading(false);
        }
        catch(err){
          setLoading(false);
          setError(true);
        }
        
      })();
    } else {
      const videoData = dataState.videos.find((item) => item._id === videoID);
      setCurrentVideo(videoData);
      if (authToken) {
        addVideoToHistory(videoData);
      }
    }
  }, [videoID]);

  return (
    <div className="single-video-page">
      {currentVideo && (
        <VideoPreview currentVideo={currentVideo} videoID={videoID} />
      )}
      {dataState?.videos.length > 0 && (
        <MoreVideos videos={dataState?.videos} />
      )}
      {loading && <Loader />}
      {error && <ErrorPage/>}
    </div>
  );
}
