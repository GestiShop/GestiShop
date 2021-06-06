//import ConfigService from '../service/config-service'
//import * as currencyList from '../../assets/config/currencies.json'
//import * as languageList from '../../assets/config/languages.json'
//import * as decimalsInfo from '../../assets/config/decimals-config.json'

// Constants
/*
const initialState = {
    lang: ConfigService.getDefaultLang() || (languageList as any).default[0],
    currencyInfo: ConfigService.getDefaultCurrency() || {
        currency: (currencyList as any).default[0],
        decimalMode: (decimalsInfo as any).default.decimalModes[0],
        floatingPositions: (decimalsInfo as any).default.floatingPositions[0]
    },
    databaseInfo: ConfigService.getDefaultDatabaseInfo() || {
        url: 'localhost',
        port: '27017',
        name: 'gestishop',
        user: 'root',
        password: ''
    },
    businessInfo: ConfigService.getDefaultBusinessInfo() || {
        name: '',
        nif: ''
    }
}*/
const initialState = {
    lang: 'en'
}

// Types
const SET_LANG = 'SET_LANG'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_DATABASE = 'SET_DATABASE'
const SET_BUSINESS = 'SET_BUSINESS'
const SET_DECIMAL_MODE = 'SET_DECIMAL_MODE'
const SET_FLOATING_POSITIONS = 'SET_FLOATING_POSITIONS'

// Reducer
export default function configurationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANG:
            return {
                ...state,
                lang: action.payload
            }

        case SET_CURRENCY:
            return {
                ...state,
                currencyInfo: {
                    ...state.currencyInfo,
                    currency: action.payload
                }
            }

        case SET_DECIMAL_MODE:
            return {
                ...state,
                currencyInfo: {
                    ...state.currencyInfo,
                    decimalMode: action.payload
                }
            }

        case SET_FLOATING_POSITIONS:
            return {
                ...state,
                currencyInfo: {
                    ...state.currencyInfo,
                    floatingPositions: action.payload
                }
            }

        case SET_DATABASE:
            return {
                ...state,
                databaseInfo: action.payload
            }

        case SET_BUSINESS:
            return {
                ...state,
                businessInfo: action.payload
            }

        default:
            return state
    }
}

// Actions
export const setDefaultLang = (lang) => (dispatch, getState) => {
    dispatch({
        type: SET_LANG,
        payload: lang
    })
}

export const setDefaultCurrency = (currency) => (dispatch, getState) => {
    dispatch({
        type: SET_CURRENCY,
        payload: currency
    })
}

export const setDefaultDatabaseInfo = (databaseInfo) => (dispatch, getState) => {
    dispatch({
        type: SET_DATABASE,
        payload: databaseInfo
    })
}

export const setDefaultBusinessInfo = (businessInfo) => (dispatch, getState) => {
    dispatch({
        type: SET_BUSINESS,
        payload: businessInfo
    })
}

export const setDefaultDecimalMode = (decimalMode) => (dispatch, getState) => {
    dispatch({
        type: SET_DECIMAL_MODE,
        payload: decimalMode
    })
}

export const setDefaultFloatingPositions = (floatingPositions) => (dispatch, getState) => {
    dispatch({
        type: SET_FLOATING_POSITIONS,
        payload: floatingPositions
    })
}