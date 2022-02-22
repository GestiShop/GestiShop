import ElectronStore from 'electron-store';
import {
  DEFAULT_CURRENCY_INFO,
  DEFAULT_LANG_CODE,
  PlatformCurrencyInfo,
  PlatformLanguageCode,
} from '../../assets/config/config';

type LocalStorageType = {
  langCode: PlatformLanguageCode;
  currencyInfo: PlatformCurrencyInfo;
};

const defaultLocalStorage: LocalStorageType = {
  langCode: DEFAULT_LANG_CODE,
  currencyInfo: DEFAULT_CURRENCY_INFO,
  // databaseInfo: {},
  // businessInfo: {},
};

const store = new ElectronStore<LocalStorageType>({
  defaults: defaultLocalStorage,
});

const LocalConfiguration = {
  getLocalLangCode(): PlatformLanguageCode {
    return store.get('langCode');
  },

  setLocalLang(langCode: PlatformLanguageCode) {
    store.set('langCode', langCode);
  },

  getLocalCurrencyInfo(): PlatformCurrencyInfo {
    return store.get('currencyInfo');
  },

  setLocalCurrencyInfo(currencyInfo: PlatformCurrencyInfo) {
    store.set('currencyInfo', currencyInfo);
  },

  // getLocalDatabaseInfo() {
  //   return store.get('databaseInfo');
  // },
  //
  // setLocalDatabaseInfo(databaseInfo) {
  //   store.set('databaseInfo', databaseInfo);
  // },
  //
  // getLocalBusinessInfo() {
  //   return store.get('businessInfo');
  // },
  //
  // setLocalBusinessInfo(businessInfo) {
  //   store.set('businessInfo', businessInfo);
  // },
};

export default LocalConfiguration;
