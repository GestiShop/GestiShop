import ElectronStore from 'electron-store';
import {
  DEFAULT_CURRENCY_INFO,
  DEFAULT_DATABASE_INFO,
  DEFAULT_LANG_CODE,
  PlatformCurrencyInfo,
  PlatformDatabaseInfo,
  PlatformLanguageCode,
} from '../../assets/config/config';

type LocalStorageType = {
  langCode: PlatformLanguageCode;
  currencyInfo: PlatformCurrencyInfo;
  databaseInfo: PlatformDatabaseInfo;
};

const defaultLocalStorage: LocalStorageType = {
  langCode: DEFAULT_LANG_CODE,
  currencyInfo: DEFAULT_CURRENCY_INFO,
  databaseInfo: DEFAULT_DATABASE_INFO,
  // businessInfo: {},
};

const store = new ElectronStore<LocalStorageType>({
  defaults: defaultLocalStorage,
});

const LocalConfiguration = {
  getLocalLangCode(): PlatformLanguageCode {
    return store.get('langCode');
  },

  setLocalLang(langCode: PlatformLanguageCode): void {
    store.set('langCode', langCode);
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

  // getLocalBusinessInfo() {
  //   return store.get('businessInfo');
  // },
  //
  // setLocalBusinessInfo(businessInfo) {
  //   store.set('businessInfo', businessInfo);
  // },
};

export default LocalConfiguration;
