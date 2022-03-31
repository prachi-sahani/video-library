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

export { getCategories, getVideos, login };
