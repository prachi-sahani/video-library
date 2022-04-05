import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../../context/authorization-context";
import {
  getPlaylists
} from "../../../../utilities/server-request/server-request";
import { PlaylistMainSection } from "../../playlistMainSection/PlaylistMainSection";
import { PlaylistVideoList } from "../../playlistVideoList/PlaylistVideoList";
import { useDBdata } from "../../../../context/db-data-context";

export function IndividualPlaylist() {
  const { playlistID } = useParams();
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { dataState, dataDispatch } = useDBdata();
  useEffect(() => {
    if (authToken) {
      if (!dataState.playlists) {
        (async () => {
          const playlistData = await getPlaylists(authToken);
          dataDispatch({
            type: "PLAYLISTS",
            payload: playlistData.data.playlists,
          });
        })();
      }
    } else {
      localStorage.setItem("lastRoute", `/explore/playlists/${playlistID}`);
      navigate("/login");
    }
  }, []);

  return (
    <div className="main-content">
      {dataState.playlists?.length === 0 &&
        <div className="heading h3 txt-gray txt-center w-100 my-3">
        <p>Playlist does not exist!</p>
        <p>Start <Link to="/explore" className="txt-primary">Exploring</Link></p>
      </div>
      }

      {dataState.playlists?.length > 0 && (
        <PlaylistMainSection
          data={
            dataState.playlists?.find((item) => item._id === playlistID)?.videos
          }
          pageTitle={
            dataState.playlists?.find((item) => item._id === playlistID)?.title
          }
          playlistID={playlistID}
        />
      )}

      {dataState.playlists?.length > 0 && (
        <PlaylistVideoList
          data={
            dataState.playlists?.find((item) => item._id === playlistID)?.videos
          }
        />
      )}
    </div>
  );
}
