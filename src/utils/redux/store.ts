import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import configurationReducer from './configuration';

const rootReducer = combineReducers({
  configuration: configurationReducer,
});

const generateStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export const store = generateStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
