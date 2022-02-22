import LocalConfiguration from '../localConfiguration';
import {
  DEFAULT_CURRENCY_INFO,
  DEFAULT_LANG_CODE,
  PlatformCurrencyInfo,
  PlatformLanguageCode,
} from '../../../assets/config/config';

const initialState = {
  langCode: LocalConfiguration.getLocalLangCode() ?? DEFAULT_LANG_CODE,
  currencyInfo:
    LocalConfiguration.getLocalCurrencyInfo() ?? DEFAULT_CURRENCY_INFO,
  // databaseInfo: LocalConfiguration.getLocalDatabaseInfo() ?? {
  //   url: 'localhost',
  //   port: '27017',
  //   name: 'gestishop',
  //   user: 'root',
  //   password: '',
  // },
  // businessInfo: LocalConfiguration.getLocalBusinessInfo() ?? {
  //   name: '',
  //   nif: '',
  //   address: EMPTY_ADDRESS,
  // },
};

// Types
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ActionValues {
  export type SetLangCode = 'SET_LANG_CODE';
  export const SET_LANG_CODE: SetLangCode = 'SET_LANG_CODE';

  export type SetCurrencyInfo = 'SET_CURRENCY_INFO';
  export const SET_CURRENCY_INFO = 'SET_CURRENCY_INFO';

  // export const SET_DATABASE = 'SET_DATABASE';
  // export const SET_BUSINESS_INFO = 'SET_BUSINESS_INFO';
}

type ReducerActionType =
  | {
      payload: PlatformLanguageCode;
      type: ActionValues.SetLangCode;
    }
  | {
      payload: PlatformCurrencyInfo;
      type: ActionValues.SetCurrencyInfo;
    };

// Reducer
export default function configurationReducer(
  state = initialState,
  action: ReducerActionType
) {
  switch (action.type) {
    case ActionValues.SET_LANG_CODE:
      return {
        ...state,
        lang: action.payload,
      };

    case ActionValues.SET_CURRENCY_INFO:
      return {
        ...state,
        currencyInfo: action.payload,
      };
    //
    // case ActionValues.SET_DECIMAL_MODE_CODE:
    //   return {
    //     ...state,
    //     currencyInfo: {
    //       ...state.currencyInfo,
    //       decimalMode: action.payload,
    //     },
    //   };
    //
    // case ActionValues.SET_FLOATING_POSITIONS:
    //   return {
    //     ...state,
    //     currencyInfo: {
    //       ...state.currencyInfo,
    //       floatingPositions: action.payload,
    //     },
    //   };
    //
    // case ActionValues.SET_DATABASE:
    //   return {
    //     ...state,
    //     databaseInfo: action.payload,
    //   };
    //
    // case ActionValues.SET_BUSINESS_INFO:
    //   return {
    //     ...state,
    //     businessInfo: action.payload,
    //   };

    default:
      return state;
  }
}

// Actions
export const setDefaultLang = (
  langCode: PlatformLanguageCode
): ReducerActionType => ({
  type: ActionValues.SET_LANG_CODE,
  payload: langCode,
});

export const setDefaultCurrencyInfo = (
  currencyInfo: PlatformCurrencyInfo
): ReducerActionType => ({
  type: ActionValues.SET_CURRENCY_INFO,
  payload: currencyInfo,
});

// export const setDefaultDatabaseInfo =
//   (databaseInfo) =>
//   (dispatch): void => {
//     dispatch({
//       type: ActionValues.SET_DATABASE,
//       payload: databaseInfo,
//     });
//   };
//
// export const setDefaultBusinessInfo =
//   (businessInfo) =>
//   (dispatch): void => {
//     dispatch({
//       type: ActionValues.SET_BUSINESS_INFO,
//       payload: businessInfo,
//     });
//   };
