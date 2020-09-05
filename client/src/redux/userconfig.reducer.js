const INITIAL_STATE = {
    darkMode: false,
}
    
    const favoritesList = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case 'SET_THEMA':
                return { ...state, darkMode: !state.darkMode };
            default:
                return state;
        }
    
    }
    export default favoritesList;