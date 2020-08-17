const INITIAL_STATE = {
    currentUser: null
}

const anotherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }

}
export default anotherReducer;