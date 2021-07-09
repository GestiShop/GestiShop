import { combineReducers, compose, createStore } from 'redux';
import configurationReducer from './configuration';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  configuration: configurationReducer,
});

const generateStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default generateStore;
