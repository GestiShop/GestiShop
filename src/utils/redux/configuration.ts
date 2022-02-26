import LocalConfiguration, { LocalStorageType } from '../localConfiguration';
import {
  PlatformBusinessInfo,
  PlatformCurrencyInfo,
  PlatformDatabaseInfo,
  PlatformLanguageInfo,
} from '../../model/types';

const initialState: LocalStorageType = {
  languageInfo: LocalConfiguration.getLocalLanguageInfo(),
  currencyInfo: LocalConfiguration.getLocalCurrencyInfo(),
  databaseInfo: LocalConfiguration.getLocalDatabaseInfo(),
  businessInfo: LocalConfiguration.getLocalBusinessInfo(),
};

// Types
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ActionValues {
  export type SetLanguageInfo = 'SET_LANGUAGE_INFO';
  export const SET_LANGUAGE_INFO: SetLanguageInfo = 'SET_LANGUAGE_INFO';

  export type SetCurrencyInfo = 'SET_CURRENCY_INFO';
  export const SET_CURRENCY_INFO = 'SET_CURRENCY_INFO';

  export type SetDatabaseInfo = 'SET_DATABASE_INFO';
  export const SET_DATABASE_INFO: SetDatabaseInfo = 'SET_DATABASE_INFO';

  export type SetBusinessInfo = 'SET_BUSINESS_INFO';
  export const SET_BUSINESS_INFO: SetBusinessInfo = 'SET_BUSINESS_INFO';
}

type ReducerActionType =
  | {
      payload: PlatformLanguageInfo;
      type: ActionValues.SetLanguageInfo;
    }
  | {
      payload: PlatformCurrencyInfo;
      type: ActionValues.SetCurrencyInfo;
    }
  | {
      payload: PlatformDatabaseInfo;
      type: ActionValues.SetDatabaseInfo;
    }
  | {
      payload: PlatformBusinessInfo;
      type: ActionValues.SetBusinessInfo;
    };

// Reducer
export default function configurationReducer(
  state = initialState,
  action: ReducerActionType
) {
  switch (action.type) {
    case ActionValues.SET_LANGUAGE_INFO:
      return {
        ...state,
        languageInfo: action.payload,
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

    case ActionValues.SET_BUSINESS_INFO:
      return {
        ...state,
        businessInfo: action.payload,
      };

    default:
      return state;
  }
}

// Actions
export const setStoredLanguageInfo = (
  languageInfo: PlatformLanguageInfo
): ReducerActionType => ({
  type: ActionValues.SET_LANGUAGE_INFO,
  payload: languageInfo,
});

export const setStoredCurrencyInfo = (
  currencyInfo: PlatformCurrencyInfo
): ReducerActionType => ({
  type: ActionValues.SET_CURRENCY_INFO,
  payload: currencyInfo,
});

export const setStoredDatabaseInfo = (
  databaseInfo: PlatformDatabaseInfo
): ReducerActionType => ({
  type: ActionValues.SET_DATABASE_INFO,
  payload: databaseInfo,
});

export const setStoredBusinessInfo = (
  businessInfo: PlatformBusinessInfo
): ReducerActionType => ({
  type: ActionValues.SET_BUSINESS_INFO,
  payload: businessInfo,
});
