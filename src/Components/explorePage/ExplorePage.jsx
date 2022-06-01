import { Route, Routes } from "react-router-dom";
import { Sidenav } from "../sidenav/Sidenav";
import { VideoListing } from "./videoListing/VideoListing";
import "./explorePage.css";
import { LikedVideos } from "./likedVideos/LikedVideos";
import { WatchLaterVideos } from "./watchLaterVideos/WatchLaterVideos";
import { HistoryVideos } from "./history-page/HistoryPage";
import { SingleVideoPage } from "./singleVideoPage/SingleVideoPage";
import { PageNotFound } from "../pageNotFound/PageNotFound";
import { PlaylistPage } from "./playlist-page/PlaylistPage";
import { IndividualPlaylist } from "./playlist-page/individual-playlist/IndividualPlaylist";
import { RequireAuth } from "../requireAuth/RequireAuth";

export function ExplorePage() {
  return (
    <main className="explore-page">
      <Sidenav />
      <Routes>
        <Route path="/" element={<VideoListing />}></Route>
        <Route
          path="/playlists/watchLater"
          element={
            <RequireAuth>
              <WatchLaterVideos />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/likedVideos"
          element={
            <RequireAuth>
              <LikedVideos />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/playlists"
          element={
            <RequireAuth>
              <PlaylistPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/playlists/:playlistID"
          element={
            <RequireAuth>
              <IndividualPlaylist />
            </RequireAuth>
          }
        ></Route>
        <Route path="/video/:videoID" element={<SingleVideoPage />}></Route>
        <Route
          path="/history"
          element={
            <RequireAuth>
              <HistoryVideos />
            </RequireAuth>
          }
        ></Route>
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
    </main>
  );
}
