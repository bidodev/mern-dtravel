const INITIAL_STATE = {
    input: null,
    mood: null
}

const searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return {
                ...state,
                input: (action.payload) ? action.payload : null
            };
        case 'UPDATE_MOOD':
                return {
                    ...state,
                    mood: (action.payload) ? action.payload : null
                };
        default:
            return state;
    }

}
export default searchReducer;