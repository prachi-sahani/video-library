import { createContext, useContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dataReducer } from "../reducers/dataReducer";
import {
  addToHistory,
  addToLikedVideo,
  addToWatchLaterVideo,
  removeFromLikedVideo,
  removeFromWatchLaterVideo,
} from "../utilities/server-request/server-request";
import { useAuth } from "./authorization-context";
import { useMessageHandling } from "./message-handling";

const DBdataContext = createContext();

function DBdataProvider({ children }) {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dataState, dataDispatch] = useReducer(dataReducer, {
    categories: [],
    videos: [],
    likedVideos: null,
    watchLaterVideos: null,
    historyVideos: null,
    playlists: null,
  });
  const { showSnackbar } = useMessageHandling();

  async function updateLikedVideo(data, videoID) {
    let isVideoLiked =
      dataState.likedVideos?.findIndex((item) => item._id === videoID) >= 0;

    if (authToken) {
      try {
        if (isVideoLiked) {
          const likedVideoData = await removeFromLikedVideo(
            authToken,
            data._id
          );
          showSnackbar(likedVideoData.data.message);
          dataDispatch({
            type: "LIKED_VIDEOS",
            payload: likedVideoData.data.likes,
          });
        } else {
          const likedVideoData = await addToLikedVideo(authToken, data);
          showSnackbar(likedVideoData.data.message);
          dataDispatch({
            type: "LIKED_VIDEOS",
            payload: likedVideoData.data.likes,
          });
        }
      } catch (err) {
        showSnackbar("Some error occurred. Try again!");
      }
    } else {
      navigate("/login",{state:{from:location}});

    }
  }

  async function updateWatchLaterVideo(data, videoID) {
    const isVideoWatchLater =
      dataState.watchLaterVideos?.findIndex((item) => item._id === videoID) >=
      0;
    if (authToken) {
      try {
        if (isVideoWatchLater) {
          const watchLaterVideoData = await removeFromWatchLaterVideo(
            authToken,
            data._id
          );
          showSnackbar(watchLaterVideoData.data.message);
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideoData.data.watchlater,
          });
        } else {
          const watchLaterVideoData = await addToWatchLaterVideo(
            authToken,
            data
          );
          showSnackbar(watchLaterVideoData.data.message);
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideoData.data.watchlater,
          });
        }
      } catch (err) {
        showSnackbar("Some error occurred. Try again!");
      }
    } else {
      navigate("/login",{state:{from:location}});

    }
  }

  function getLikeStatusClassName(videoID) {
    let isVideoLiked =
      dataState.likedVideos?.findIndex((item) => item._id === videoID) >= 0;
    return isVideoLiked && authToken ? "" : "-outlined";
  }
  function getWatchLaterStatusClassName(videoID) {
    const isVideoWatchLater =
      dataState.watchLaterVideos?.findIndex((item) => item._id === videoID) >=
      0;
    return isVideoWatchLater && authToken ? "" : "-outlined";
  }

  async function addVideoToHistory(videoData) {
    const isVideoInHistory =
      dataState.historyVideos?.findIndex(
        (item) => item._id === videoData._id
      ) >= 0
        ? true
        : false;
    // if video already in history, bring it to top
    if (isVideoInHistory) {
      dataDispatch({
        type: "HISTORY_VIDEOS",
        payload: [
          videoData,
          ...dataState.historyVideos.filter(
            (item) => item._id !== videoData._id
          ),
        ],
      });
    } else {
      const historyData = await addToHistory(authToken, videoData);
      dataDispatch({
        type: "HISTORY_VIDEOS",
        payload: [...historyData.data.history].reverse(), // last watched video on top
      });
    }
  }

  return (
    <DBdataContext.Provider
      value={{
        dataState,
        dataDispatch,
        updateLikedVideo,
        updateWatchLaterVideo,
        getLikeStatusClassName,
        getWatchLaterStatusClassName,
        addVideoToHistory,
      }}
    >
      {children}
    </DBdataContext.Provider>
  );
}

const useDBdata = () => useContext(DBdataContext);

export { useDBdata, DBdataProvider };
