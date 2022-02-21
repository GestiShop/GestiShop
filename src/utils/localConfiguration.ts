import ElectronStore from 'electron-store';
import {
  DEFAULT_LANG_CODE,
  PlatformLanguageCode,
} from '../../assets/config/config';

type LocalStorageType = {
  langCode: PlatformLanguageCode;
};

const defaultLocalStorage: LocalStorageType = {
  langCode: DEFAULT_LANG_CODE,
  // currencyInfo: {},
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

  // getLocalCurrencyInfo() {
  //   return store.get('currencyInfo');
  // },
  //
  // // TODO: MAKE THIS MORE STRICT
  // setLocalCurrency(currencyCode: string) {
  //   store.set('currencyInfo.currencyCode', currencyCode);
  // },
  //
  // // TODO: MAKE THIS MORE STRICT
  // setLocalDecimalMode(decimalModeCode: string) {
  //   store.set('currencyInfo.decimalModeCode', decimalModeCode);
  // },
  //
  // // TODO: MAKE THIS MORE STRICT
  // setLocalFloatingPositions(floatingPositions: number) {
  //   store.set('currencyInfo.floatingPositions', floatingPositions);
  // },
  //
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
