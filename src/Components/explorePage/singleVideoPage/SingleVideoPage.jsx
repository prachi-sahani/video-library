import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDBdata } from "../../../context/db-data-context";
import { getVideos } from "../../../utilities/server-request/server-request";
import "./singleVideoPage.css";
import { MoreVideos } from "./MoreVideos";
import { VideoPreview } from "./VideoPreview";

export function SingleVideoPage() {
  const { videoID } = useParams();
  const { dataState, dataDispatch } = useDBdata();
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (!dataState.videos.length) {
      (async () => {
        const videoListData = await getVideos();
        setCurrentVideo(
          videoListData.data.videos.find((item) => item._id === videoID)
        );
        dataDispatch({ type: "VIDEOS", payload: videoListData.data.videos });
      })();
    } else {
      setCurrentVideo(dataState.videos.find((item) => item._id === videoID));
    }
  }, [videoID]);

  return (
    <div className="single-video-page">
      {currentVideo && (
        <VideoPreview currentVideo={currentVideo} videoID={videoID} />
      )}
      <MoreVideos videos={dataState?.videos} />
    </div>
  );
}
