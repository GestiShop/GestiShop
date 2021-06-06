import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import configurationReducer from "./configuration";

const rootReducer = combineReducers({
    configuration: configurationReducer
})

const generateStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(ReduxThunk)))
}

export default generateStore
