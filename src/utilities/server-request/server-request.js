import axios from "axios";

function getCategories() {
  return axios.get("/api/categories");
}

function getVideos() {
  return axios.get("/api/videos");
}

function login(data) {
  return axios.post("/api/auth/login", data);
}

function getLikedVideos(token) {
  return axios.get("/api/user/likes", {
    headers: { authorization: token },
  });
}

function addToLikedVideo(token, video) {
  return axios.post(
    "/api/user/likes",
    { video },
    {
      headers: { authorization: token },
    }
  );
}

function removeFromLikedVideo(token, videoId) {
  return axios.delete(`/api/user/likes/${videoId}`, {
    headers: { authorization: token },
  });
}

function getWatchLaterVideos(token) {
  return axios.get("/api/user/watchlater", {
    headers: { authorization: token },
  });
}

function addToWatchLaterVideo(token, video) {
  return axios.post(
    "/api/user/watchlater",
    { video },
    {
      headers: { authorization: token },
    }
  );
}

function removeFromWatchLaterVideo(token, videoId) {
  return axios.delete(`/api/user/watchlater/${videoId}`, {
    headers: { authorization: token },
  });
}

function getHistory(token) {
  return axios.get("/api/user/history", {
    headers: { authorization: token },
  });
}

function addToHistory(token, video) {
  return axios.post(
    "/api/user/history",
    { video },
    {
      headers: { authorization: token },
    }
  );
}

function removeFromHistory(token, videoId) {
  return axios.delete(`/api/user/history/${videoId}`, {
    headers: { authorization: token },
  });
}

function clearAllHistory(token) {
  return axios.delete(`/api/user/history/all`, {
    headers: { authorization: token },
  });
}

function getPlaylists(token) {
  return axios.get("/api/user/playlists", {
    headers: { authorization: token },
  });
}

function addPlaylist(token, playlist) {
  return axios.post(
    "/api/user/playlists",
    { playlist },
    { headers: { authorization: token } }
  );
}

function removePlaylist(token, playlistId) {
  return axios.delete(`/api/user/playlists/${playlistId}`, {
    headers: { authorization: token },
  });
}

function getSelectedPlaylist(token, playlistId) {
  return axios.get(`/api/user/playlists/${playlistId}`, {
    headers: { authorization: token },
  });
}

function addVideoToPlaylist(token, playlistId, video) {
  return axios.post(
    `/api/user/playlists/${playlistId}`,
    { video },
    { headers: { authorization: token } }
  );
}

function removeVideoFromPlaylist(token, playlistId, videoId) {
  return axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {
    headers: { authorization: token },
  });
}

export {
  getCategories,
  getVideos,
  login,
  getLikedVideos,
  addToLikedVideo,
  removeFromLikedVideo,
  getWatchLaterVideos,
  addToWatchLaterVideo,
  removeFromWatchLaterVideo,
  getHistory,
  addToHistory,
  removeFromHistory,
  clearAllHistory,
  getPlaylists,
  addPlaylist,
  removePlaylist,
  getSelectedPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
