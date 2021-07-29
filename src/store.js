import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promiseMiddlerware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux';

const persistConfig = {
  key: 'root',
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(
  enhancedReducer,
  applyMiddleware(promiseMiddlerware, reduxThunk),
);
