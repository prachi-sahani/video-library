export function dataReducer(state, action) {
  switch (action.type) {
    case "CATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case "VIDEOS": {
      return {
        ...state,
        videos: action.payload,
      };
    }
    case "LIKED_VIDEOS": {
      return {
        ...state,
        likedVideos: action.payload,
      };
    }
    case "WATCH_LATER_VIDEOS": {
      return {
        ...state,
        watchLaterVideos: action.payload,
      };
    }
    case "HISTORY_VIDEOS": {
      return {
        ...state,
        historyVideos: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
