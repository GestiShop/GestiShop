import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import configurationReducer from './configuration'

const rootReducer = combineReducers({
    configuration: configurationReducer
})

const generateStore = () => {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(ReduxThunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}

export default generateStore
