import { useState } from "react";
import { useAuth } from "../../../context/authorization-context";
import { useDBdata } from "../../../context/db-data-context";
import { useMessageHandling } from "../../../context/message-handling";
import {
  addPlaylist,
  addVideoToPlaylist,
} from "../../../utilities/server-request/server-request";

export function AddPlaylistForm({
  videoSelected,
  setShowCreatePlaylistForm,
  setShowPlaylistDialog,
}) {
  const { authToken } = useAuth();
  const { dataState, dataDispatch } = useDBdata();
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { showSnackbar } = useMessageHandling();

  function updateNewPlaylistData(type, value) {
    if (type === "title") {
      setErrorMsg("");
      setPlaylistTitle(value);
    } else {
      setPlaylistDescription(value);
    }
  }

  async function createPlaylist(event, title, description) {
    event.preventDefault();
    if (title) {
      try {
        setLoading(true);
        const updatedPlaylists = await addPlaylist(authToken, {
          title,
          description,
        });
        const updatedPlaylistData =
          updatedPlaylists.data.playlists[
            updatedPlaylists.data.playlists.length - 1
          ];

        const updatedVideoList = await addVideoToPlaylist(
          authToken,
          updatedPlaylistData._id,
          videoSelected
        );
        dataDispatch({
          type: "PLAYLISTS",
          payload: [...dataState.playlists, updatedVideoList.data.playlist],
        });
        showSnackbar(updatedVideoList.data.message);
        setLoading(false);
        setShowCreatePlaylistForm(false);
        setShowPlaylistDialog(false);
      } catch (err) {
        setLoading(false);
        showSnackbar("Some error occurred. Try Again!");
      }
    } else {
      setErrorMsg("Required field");
    }
  }

  return (
    <form>
      <label htmlFor="playlist-name" className="txt-sm txt-bold">
        Title<sup className="msg-err">*</sup>
      </label>
      <input
        className="playlist-input mt-2 w-100"
        type="text"
        name="playlist-name"
        id="playlist-name"
        placeholder="Enter playlist title"
        required
        autoComplete="off"
        maxLength="50"
        onChange={(e) => updateNewPlaylistData("title", e.target.value)}
      />
      <div className="txt-sm mt-1 mb-3 input-msg">
        <span className="msg-err ">{errorMsg}</span>
        <span className="txt-right txt-sm">{playlistTitle.length}/50</span>
      </div>
      <label htmlFor="playlist-desc" className="txt-sm txt-bold ">
        Description
      </label>
      <textarea
        required
        className="playlist-input mt-2 mb-3 w-100"
        type="text"
        name="playlist-desc"
        id="playlist-desc"
        autoComplete="off"
        placeholder="Enter playlist description"
        onChange={(e) => updateNewPlaylistData("desc", e.target.value)}
      />

      <div className="txt-right mt-2">
        <button
          className="btn-link mx-2 txt-bold"
          type="button"
          disabled={loading}
          onClick={() => setShowCreatePlaylistForm(false)}
        >
          Cancel
        </button>
        <button
          className="btn-link btn-link-primary ml-1 txt-bold"
          type="submit"
          disabled={loading}
          onClick={(e) => createPlaylist(e, playlistTitle, playlistDescription)}
        >
          Create
        </button>
      </div>
    </form>
  );
}
