import "./videoListing.css";
import "../../../styles.css";
import { CategoryTags } from "./CategoryTags";
import { Loader } from "../../loader/Loader";
import { VideoCard } from "./VideoCard";
import { useDBdata } from "../../../context/db-data-context";
import {
  getCategories,
  getVideos,
} from "../../../utilities/server-request/server-request";
import { useEffect, useState } from "react";
import { useVideoListData } from "../../../context/video-list-management";
import { PlaylistDialog } from "../playlistDialog/PlaylistDialog";
import { ErrorPage } from "../../errorPage/ErrorPage";

export function VideoListing() {
  const { dataState, dataDispatch } = useDBdata();
  const { filteredVideoArray } = useVideoListData();
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataState.videos.length) {
      (async () => {
        try {
          setLoading(true);
          const videoListData = await getVideos();
          dataDispatch({ type: "VIDEOS", payload: videoListData.data.videos });
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(true);
        }
      })();
    }
    if (!dataState.categories.length) {
      (async () => {
        try {
          setLoading(true);
          const categoriesData = await getCategories();
          dataDispatch({
            type: "CATEGORIES",
            payload: categoriesData.data.categories,
          });
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(true);
        }
      })();
    }
  }, []);

  return (
    <>
      <div className="videos">
        {dataState.videos?.length > 0 && dataState.categories?.length > 0 && (
          <CategoryTags categories={dataState.categories} />
        )}
        {dataState.videos?.length > 0 && dataState.categories?.length > 0 && (
          <div className="video-list">
            {filteredVideoArray.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                setShowPlaylistDialog={setShowPlaylistDialog}
                setVideoSelected={setVideoSelected}
              />
            ))}
            {!filteredVideoArray.length && (
              <div className="mx-auto heading h3 txt-gray py-5">
                We couldn't find any matches!
              </div>
            )}
          </div>
        )}
        {showPlaylistDialog && (
          <PlaylistDialog
            videoSelected={videoSelected}
            setShowPlaylistDialog={setShowPlaylistDialog}
          />
        )}
        {loading && <Loader />}
        {error && <ErrorPage />}
      </div>
    </>
  );
}
