import LocalConfiguration from '../localConfiguration';
import {
  DEFAULT_CURRENCY_INFO,
  DEFAULT_LANG_CODE,
  PlatformCurrencyInfo,
  PlatformDatabaseInfo,
  PlatformLanguageCode,
} from '../../../assets/config/config';

const initialState = {
  langCode: LocalConfiguration.getLocalLangCode() ?? DEFAULT_LANG_CODE,
  currencyInfo:
    LocalConfiguration.getLocalCurrencyInfo() ?? DEFAULT_CURRENCY_INFO,
  databaseInfo:
    LocalConfiguration.getLocalDatabaseInfo() ?? DEFAULT_DATABASE_INFO,
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

  export type SetDatabaseInfo = 'SET_DATABASE_INFO';
  export const SET_DATABASE_INFO: SetDatabaseInfo = 'SET_DATABASE_INFO';

  export type SetBusinessInfo = 'SET_BUSINESS_INFO';
  export const SET_BUSINESS_INFO: SetBusinessInfo = 'SET_BUSINESS_INFO';
}

type ReducerActionType =
  | {
      payload: PlatformLanguageCode;
      type: ActionValues.SetLangCode;
    }
  | {
      payload: PlatformCurrencyInfo;
      type: ActionValues.SetCurrencyInfo;
    }
  | {
      payload: PlatformDatabaseInfo;
      type: ActionValues.SetDatabaseInfo;
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

    case ActionValues.SET_DATABASE_INFO:
      return {
        ...state,
        databaseInfo: action.payload,
      };

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

export const setDefaultDatabaseInfo = (
  databaseInfo: PlatformDatabaseInfo
): ReducerActionType => ({
  type: ActionValues.SET_DATABASE_INFO,
  payload: databaseInfo,
});

// export const setDefaultBusinessInfo =
//   (businessInfo) =>
//   (dispatch): void => {
//     dispatch({
//       type: ActionValues.SET_BUSINESS_INFO,
//       payload: businessInfo,
//     });
//   };
