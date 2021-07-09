import LocalConfiguration from '../utils/localConfiguration';
import {
  CURRENCY_LIST,
  DECIMAL_MODES,
  FLOATING_POINT_OPTIONS,
  LANGUAGE_LIST,
} from '../../assets/config/config';

const initialState = {
  lang: LocalConfiguration.getDefaultLang() || LANGUAGE_LIST[0],
  currencyInfo: LocalConfiguration.getDefaultCurrency() || {
    currency: CURRENCY_LIST[0],
    decimalMode: DECIMAL_MODES[0],
    floatingPositions: FLOATING_POINT_OPTIONS[0],
  },
  databaseInfo: LocalConfiguration.getDefaultDatabaseInfo() || {
    url: 'localhost',
    port: '27017',
    name: 'gestishop',
    user: 'root',
    password: '',
  },
  businessInfo: LocalConfiguration.getDefaultBusinessInfo() || {
    name: '',
    nif: '',
  },
};

// Types
const SET_LANG = 'SET_LANG';
const SET_CURRENCY = 'SET_CURRENCY';
const SET_DATABASE = 'SET_DATABASE';
const SET_BUSINESS = 'SET_BUSINESS';
const SET_DECIMAL_MODE = 'SET_DECIMAL_MODE';
const SET_FLOATING_POSITIONS = 'SET_FLOATING_POSITIONS';

// Reducer
export default function configurationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    case SET_CURRENCY:
      return {
        ...state,
        currencyInfo: {
          ...state.currencyInfo,
          currency: action.payload,
        },
      };

    case SET_DECIMAL_MODE:
      return {
        ...state,
        currencyInfo: {
          ...state.currencyInfo,
          decimalMode: action.payload,
        },
      };

    case SET_FLOATING_POSITIONS:
      return {
        ...state,
        currencyInfo: {
          ...state.currencyInfo,
          floatingPositions: action.payload,
        },
      };

    case SET_DATABASE:
      return {
        ...state,
        databaseInfo: action.payload,
      };

    case SET_BUSINESS:
      return {
        ...state,
        businessInfo: action.payload,
      };

    default:
      return state;
  }
}

// Actions
export const setDefaultLang = (lang) => (dispatch) => {
  dispatch({
    type: SET_LANG,
    payload: lang,
  });
};

export const setDefaultCurrency = (currency) => (dispatch) => {
  dispatch({
    type: SET_CURRENCY,
    payload: currency,
  });
};

export const setDefaultDatabaseInfo = (databaseInfo) => (dispatch) => {
  dispatch({
    type: SET_DATABASE,
    payload: databaseInfo,
  });
};

export const setDefaultBusinessInfo = (businessInfo) => (dispatch) => {
  dispatch({
    type: SET_BUSINESS,
    payload: businessInfo,
  });
};

export const setDefaultDecimalMode = (decimalMode) => (dispatch) => {
  dispatch({
    type: SET_DECIMAL_MODE,
    payload: decimalMode,
  });
};

export const setDefaultFloatingPositions =
  (floatingPositions) => (dispatch) => {
    dispatch({
      type: SET_FLOATING_POSITIONS,
      payload: floatingPositions,
    });
  };
