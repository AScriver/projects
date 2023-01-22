import { combineReducers, createStore } from 'redux';
import auth from './auth/reducer';
import { loadState, saveState } from '../utils/localStorage';

const rootReducer = combineReducers({
  auth
});

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
