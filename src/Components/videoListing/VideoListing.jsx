import "./videoListing.css";
import "../../styles.css";
import { CategoryTags } from "./CategoryTags";
import { Loader } from "../loader/Loader";
import { VideoCard } from "./VideoCard";
import { useDBdata } from "../../context/db-data-context";
import {
  getCategories,
  getVideos,
} from "../../utilities/server-request/server-request";
import { useEffect } from "react";
import { useVideoListData } from "../../context/video-list-management";

export function VideoListing() {
  const { dataState, dataDispatch } = useDBdata();
  const { filteredVideoArray } = useVideoListData();
  useEffect(() => {
    if (!dataState.videos.length) {
      (async () => {
        const videoListData = await getVideos();
        dataDispatch({ type: "VIDEOS", payload: videoListData.data.videos });
      })();
    }
    if (!dataState.categories.length) {
      (async () => {
        const categoriesData = await getCategories();
        dataDispatch({
          type: "CATEGORIES",
          payload: categoriesData.data.categories,
        });
      })();
    }
  },[]);

  return (
    <>
      <div className="videos">
        {dataState.videos?.length > 0 && dataState.categories?.length > 0 && (
          <CategoryTags categories={dataState.categories} />
        )}
        {dataState.videos?.length > 0 && dataState.categories?.length > 0 && (
          <div className="video-list">
            {filteredVideoArray.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
            {!filteredVideoArray.length && (
              <div className="mx-auto h3 py-5">
                We couldn't find any matches!
              </div>
            )}
          </div>
        )}
        {dataState.videos?.length === 0 &&
          dataState.categories?.length === 0 && <Loader />}
      </div>
    </>
  );
}
