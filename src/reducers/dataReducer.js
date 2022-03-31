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
    default:
      return { ...state };
  }
}
