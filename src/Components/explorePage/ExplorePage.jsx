import { Route, Routes } from "react-router-dom";
import { Sidenav } from "../sidenav/Sidenav";
import { VideoListing } from "./videoListing/VideoListing";
import "./explorePage.css";
import { LikedVideos } from "./likedVideos/LikedVideos";
import { WatchLaterVideos } from "./watchLaterVideos/WatchLaterVideos";
import { HistoryVideos } from "./history-page/HistoryPage";
import { SingleVideoPage } from "./singleVideoPage/SingleVideoPage";
import { PageNotFound } from "../pageNotFound/PageNotFound";

export function ExplorePage() {
  return (
    <main className="explore-page">
      <Sidenav />
      <Routes>
        <Route path="/" element={<VideoListing />}></Route>
        <Route path="/watchLater" element={<WatchLaterVideos />}></Route>
        <Route path="/likedVideos" element={<LikedVideos />}></Route>
        <Route path="/video/:videoID" element={<SingleVideoPage />}></Route>
        <Route path="/history" element={<HistoryVideos />}></Route>
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
    </main>
  );
}
