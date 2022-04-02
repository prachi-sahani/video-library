import { Route, Routes } from "react-router-dom";
import { Sidenav } from "../sidenav/Sidenav";
import { VideoListing } from "./videoListing/VideoListing";
import "./explorePage.css";
import { LikedVideos } from "./likedVideos/LikedVideos";
import { WatchLaterVideos } from "./watchLaterVideos/WatchLaterVideos";

export function ExplorePage() {
  return (
    <main className="explore-page">
      <Sidenav />
      <Routes>
        <Route path="/" element={<VideoListing />}></Route>
        <Route path="/watchLater" element={<WatchLaterVideos />}></Route>
        <Route path="/likedVideos" element={<LikedVideos />}></Route>
      </Routes>
    </main>
  );
}
