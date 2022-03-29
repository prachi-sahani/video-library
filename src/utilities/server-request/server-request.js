import axios from "axios";

 function getCategories() {
  try {
    return axios.get("/api/categories");
  } catch (error) {
    console.log(error);
  }
}

export { getCategories }