import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDBdata } from "./db-data-context";
const VideoListContext = createContext();

function VideoListProvider({ children }) {
  const { dataState } = useDBdata();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const filteredVideoArray = getFilteredVideosArray(
    dataState.videos,
    selectedCategory
  );
  function getFilteredVideosArray(videoList, category) {
    if (category.toLowerCase() === "all") {
      return videoList;
    }
    return videoList.filter(
      (video) => video.category.toLowerCase() === category.toLowerCase()
    );
  }

  function goToVideoListing(category){
    setSelectedCategory(category);
    navigate("/explore")
  }

  return (
    <VideoListContext.Provider
      value={{
        filteredVideoArray,
        selectedCategory,
        setSelectedCategory,
        goToVideoListing
      }}
    >
      {children}
    </VideoListContext.Provider>
  );
}

const useVideoListData = () => useContext(VideoListContext);

export { VideoListProvider, useVideoListData };
