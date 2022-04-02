import axios from "axios";

function getCategories() {
  try {
    return axios.get("/api/categories");
  } catch (error) {
    console.log(error);
  }
}

function getVideos() {
  try {
    return axios.get("/api/videos");
  } catch (error) {
    console.log(error);
  }
}

function login(data) {
  try {
    return axios.post("/api/auth/login", data);
  } catch (error) {
    console.log(error);
  }
}

function getLikedVideos(token) {
  try {
    return axios.get("/api/user/likes", {
      headers: { authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
}

function addToLikedVideo(token, video) {
  try {
    return axios.post("/api/user/likes", { video }  , {
      headers: { authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
}

function removeFromLikedVideo(token, videoId) {
  try {
    return axios.delete(`/api/user/likes/${videoId}`, {
      headers: { authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
}

function getWatchLaterVideos(token) {
  try {
    return axios.get("/api/user/watchlater", {
      headers: { authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
}

function addToWatchLaterVideo(token, video) {
  try {
    return axios.post("/api/user/watchlater", { video }  , {
      headers: { authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
}

function removeFromWatchLaterVideo(token, videoId) {
  try {
    return axios.delete(`/api/user/watchlater/${videoId}`, {
      headers: { authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
}


export { getCategories, getVideos, login, getLikedVideos, addToLikedVideo, removeFromLikedVideo, getWatchLaterVideos, addToWatchLaterVideo, removeFromWatchLaterVideo };
