/* eslint-disable no-underscore-dangle */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import configurationReducer from './configuration';

const rootReducer = combineReducers({
  configuration: configurationReducer,
});

const generateStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default generateStore;
