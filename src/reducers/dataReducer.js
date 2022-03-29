export function dataReducer(state, action) {
  switch (action.type) {
    case "CATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
