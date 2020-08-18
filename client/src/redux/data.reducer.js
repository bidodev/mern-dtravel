const dataReducer = (state = {backgrounds: []}, action) => {
  switch (action.type) {
    case "UPDATE_DATA": {
      return { ...state, destinations: action.payload };
    }
    case "SET_BACKGROUNDS": {
      return { ...state, backgrounds: action.payload };
    }
    default:
      return state;
  }
};

export default dataReducer;
