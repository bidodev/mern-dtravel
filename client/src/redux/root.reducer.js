import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//load our reducers
import loginReducer from './login.reducer'
import dataReducer from './data.reducer'
import searchReducer from './filters.reducer'
import favoritesReducer from './favorites.reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["favoritesList"]
}

const rootReducer = combineReducers({
    login: loginReducer,
    data: dataReducer,
    searchInput: searchReducer,
    favoritesList: favoritesReducer
})

export default persistReducer(persistConfig, rootReducer);