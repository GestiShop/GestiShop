import LocalConfiguration from '../localConfiguration';
import {
  DEFAULT_LANG_CODE,
  PlatformLanguageCode,
} from '../../../assets/config/config';

const initialState = {
  langCode: LocalConfiguration.getLocalLangCode() ?? DEFAULT_LANG_CODE,
  // currencyInfo: LocalConfiguration.getLocalCurrencyInfo() ?? {
  //   currencyCode: CURRENCY_LIST[0]?.value,
  //   decimalModeCode: DECIMAL_MODES[0],
  //   floatingPositions: FLOATING_POINT_OPTIONS[0],
  // },
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

  // export const SET_CURRENCY_CODE = 'SET_CURRENCY_CODE';
  // export const SET_DATABASE = 'SET_DATABASE';
  // export const SET_DECIMAL_MODE_CODE = 'SET_DECIMAL_MODE_CODE';
  // export const SET_FLOATING_POSITIONS = 'SET_FLOATING_POSITIONS';
  // export const SET_BUSINESS_INFO = 'SET_BUSINESS_INFO';
}

// type ActionType = typeof ActionValues[keyof typeof ActionValues];

type ReducerActionType = {
  payload: PlatformLanguageCode;
  type: ActionValues.SetLangCode;
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

    // case ActionValues.SET_CURRENCY_CODE:
    //   return {
    //     ...state,
    //     currencyInfo: {
    //       ...state.currencyInfo,
    //       currency: action.payload,
    //     },
    //   };
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
export const setDefaultLang = (langCode: PlatformLanguageCode) => ({
  type: ActionValues.SET_LANG_CODE,
  payload: langCode,
});

//
// export const setDefaultCurrency =
//   (
//     currencyCode: string // TODO: MAKE THIS MORE STRICT
//   ) =>
//   (dispatch): void => {
//     dispatch({
//       type: ActionValues.SET_CURRENCY_CODE,
//       payload: currencyCode,
//     });
//   };
//
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
//
// export const setDefaultDecimalMode =
//   (
//     decimalMode: string // TODO: MAKE THIS MORE STRICT
//   ) =>
//   (dispatch): void => {
//     dispatch({
//       type: ActionValues.SET_DECIMAL_MODE_CODE,
//       payload: decimalMode,
//     });
//   };
//
// export const setDefaultFloatingPositions =
//   (
//     floatingPositions: number // TODO: MAKE THIS MORE STRICT
//   ) =>
//   (dispatch): void => {
//     dispatch({
//       type: ActionValues.SET_FLOATING_POSITIONS,
//       payload: floatingPositions,
//     });
//   };
