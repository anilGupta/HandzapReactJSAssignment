import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = preLoadedState =>
  createStore(rootReducer, preLoadedState, compose(applyMiddleware(thunk)));

export default configureStore;
