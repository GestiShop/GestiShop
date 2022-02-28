import ElectronStore from 'electron-store';
import {
  DEFAULT_CURRENCY_INFO,
  DEFAULT_DATABASE_INFO,
  DEFAULT_LANGUAGE_INFO,
  DEFAULT_BUSINESS_INFO,
  PlatformCurrencyInfo,
  PlatformDatabaseInfo,
  PlatformLanguageInfo,
  PlatformBusinessInfo,
} from '../model';

export type LocalStorageType = {
  languageInfo: PlatformLanguageInfo;
  currencyInfo: PlatformCurrencyInfo;
  databaseInfo: PlatformDatabaseInfo;
  businessInfo: PlatformBusinessInfo;
};

const defaultLocalStorage: LocalStorageType = {
  languageInfo: DEFAULT_LANGUAGE_INFO,
  currencyInfo: DEFAULT_CURRENCY_INFO,
  databaseInfo: DEFAULT_DATABASE_INFO,
  businessInfo: DEFAULT_BUSINESS_INFO,
};

const store = new ElectronStore<LocalStorageType>({
  defaults: defaultLocalStorage,
});

const LocalConfiguration = {
  getLocalLanguageInfo(): PlatformLanguageInfo {
    return store.get('languageInfo');
  },

  setLocalLang(languageInfo: PlatformLanguageInfo): void {
    store.set('languageInfo', languageInfo);
  },

  getLocalCurrencyInfo(): PlatformCurrencyInfo {
    return store.get('currencyInfo');
  },

  setLocalCurrencyInfo(currencyInfo: PlatformCurrencyInfo): void {
    store.set('currencyInfo', currencyInfo);
  },

  getLocalDatabaseInfo(): PlatformDatabaseInfo {
    return store.get('databaseInfo');
  },

  setLocalDatabaseInfo(databaseInfo: PlatformDatabaseInfo): void {
    store.set('databaseInfo', databaseInfo);
  },

  getLocalBusinessInfo(): PlatformBusinessInfo {
    return store.get('businessInfo');
  },

  setLocalBusinessInfo(businessInfo: PlatformBusinessInfo): void {
    store.set('businessInfo', businessInfo);
  },
};

export default LocalConfiguration;
