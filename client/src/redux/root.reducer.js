import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//load our reducers
import loginReducer from './login.reducer';
import dataReducer from './data.reducer';
import searchReducer from './filters.reducer';
import favoritesReducer from './favorites.reducer';
import userConfigReducer from './userconfig.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favoritesList', 'filters', 'userConfig'],
};

const rootReducer = combineReducers({
  login: loginReducer,
  data: dataReducer,
  filters: searchReducer,
  favoritesList: favoritesReducer,
  userConfig: userConfigReducer,
});

export default persistReducer(persistConfig, rootReducer);
