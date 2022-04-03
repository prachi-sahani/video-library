import {
    createContext,
    useContext,
    useReducer,
  } from "react";
import { useNavigate } from "react-router-dom";
  import { dataReducer } from "../reducers/dataReducer";
import { addToLikedVideo, addToWatchLaterVideo, removeFromLikedVideo, removeFromWatchLaterVideo } from "../utilities/server-request/server-request";
import { useAuth } from "./authorization-context";
  
  const DBdataContext = createContext();
  
  function DBdataProvider({ children }) {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [dataState, dataDispatch] = useReducer(dataReducer, {
      categories: [],
      videos:[],
      likedVideos:null,
      watchLaterVideos:null,
      historyVideos:null
    });
  
    async function updateLikedVideo(data, videoID) {
      let isVideoLiked =
    dataState.likedVideos?.findIndex((item) => item._id === videoID) >= 0;
  
      if (authToken) {
        if (isVideoLiked) {
          const likedVideoData = await removeFromLikedVideo(authToken, data._id);
          dataDispatch({
            type: "LIKED_VIDEOS",
            payload: likedVideoData.data.likes,
          });
        } else {
          const likedVideoData = await addToLikedVideo(authToken, data);
          dataDispatch({
            type: "LIKED_VIDEOS",
            payload: likedVideoData.data.likes,
          });
        }
      } else {
        localStorage.setItem("lastRoute", `/explore/video/${videoID}`);
        navigate("/login");
      }
    }
  
    async function updateWatchLaterVideo(data, videoID) {
      const isVideoWatchLater =
    dataState.watchLaterVideos?.findIndex((item) => item._id === videoID) >= 0;
      if (authToken) {
        if (isVideoWatchLater) {
          const watchLaterVideoData = await removeFromWatchLaterVideo(
            authToken,
            data._id
          );
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideoData.data.watchlater,
          });
        } else {
          const watchLaterVideoData = await addToWatchLaterVideo(authToken, data);
          dataDispatch({
            type: "WATCH_LATER_VIDEOS",
            payload: watchLaterVideoData.data.watchlater,
          });
        }
      } else {
        localStorage.setItem("lastRoute", `/explore/video/${videoID}`);
        navigate("/login");
      }
    }

    

  function getLikeStatusClassName(videoID) {
    let isVideoLiked =
    dataState.likedVideos?.findIndex((item) => item._id === videoID) >= 0;
    return isVideoLiked && authToken ? "" : "-outlined";
  }
  function getWatchLaterStatusClassName(videoID) {
    const isVideoWatchLater =
    dataState.watchLaterVideos?.findIndex((item) => item._id === videoID) >= 0;
    return isVideoWatchLater && authToken ? "" : "-outlined";
  }
  
    return (
      <DBdataContext.Provider
        value={{
          dataState,
          dataDispatch,
          updateLikedVideo,
          updateWatchLaterVideo,
          getLikeStatusClassName,
          getWatchLaterStatusClassName
        }}
      >
        {children}
      </DBdataContext.Provider>
    );
  }
  
  const useDBdata = () => useContext(DBdataContext);
  
  export { useDBdata, DBdataProvider };
  