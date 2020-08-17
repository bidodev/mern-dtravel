import INITIAL_STATE from './data.json'

const dataReducer = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case "UPDATE_DATA": {
      return {...state, destinations: action.payload}
    }
    default:
      return state;
  }
};

export default dataReducer;
