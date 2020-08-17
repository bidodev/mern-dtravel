const INITIAL_STATE = [
/**
 * Expect list the objects
 * {id, name}
 */
]

const favoritesList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE FAVORITE':
            const isOnFavorites = state.some((favorite) => favorite.id === action.payload.id)
            
            if (isOnFavorites) {
                return [...state].filter(obj => obj.id !== action.payload.id)
            }
            else {
                return [...state, action.payload];
            }
        default:
            return state;
    }

}
export default favoritesList;