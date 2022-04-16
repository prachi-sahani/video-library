import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/authorization-context";
import { getPlaylists } from "../../../../utilities/server-request/server-request";
import { PlaylistMainSection } from "../../playlistMainSection/PlaylistMainSection";
import { PlaylistVideoList } from "../../playlistVideoList/PlaylistVideoList";
import { useDBdata } from "../../../../context/db-data-context";
import { ErrorPage } from "../../../errorPage/ErrorPage";
import { Loader } from "../../../loader/Loader";

export function IndividualPlaylist() {
  const { playlistID } = useParams();
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { dataState, dataDispatch } = useDBdata();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!dataState.playlists) {
      (async () => {
        try {
          setLoading(true);
          const playlistData = await getPlaylists(authToken);
          dataDispatch({
            type: "PLAYLISTS",
            payload: playlistData.data.playlists,
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
    <div className="main-content">
      {loading && <Loader />}
      {error && <ErrorPage />}

      {!dataState.playlists?.find((item) => item._id === playlistID) && !error && (
        <div className="heading h3 txt-gray txt-center w-100 my-3">
          <p>Playlist does not exist!</p>
          <p>
            Start
            <Link to="/explore" className="txt-primary">
              Exploring
            </Link>
          </p>
        </div>
      )}

      {dataState.playlists?.find((item) => item._id === playlistID) && (
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

      {dataState.playlists?.find((item) => item._id === playlistID) && (
        <PlaylistVideoList
          data={
            dataState.playlists?.find((item) => item._id === playlistID)?.videos
          }
        />
      )}
    </div>
  );
}
