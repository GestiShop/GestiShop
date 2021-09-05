import Store from 'electron-store';

const schema = {
  lang: {},
  currencyInfo: {},
  databaseInfo: {},
  businessInfo: {},
};

const store = new Store({ schema });

const LocalConfiguration = {
  getLocalLang() {
    return store.get('lang');
  },

  setLocalLang(lang) {
    store.set('lang', lang);
  },

  getLocalCurrencyInfo() {
    return store.get('currencyInfo');
  },

  setLocalCurrency(currency) {
    store.set('currencyInfo.currency', currency);
  },

  setLocalDecimalMode(decimalMode) {
    store.set('currencyInfo.decimalMode', decimalMode);
  },

  setLocalFloatingPositions(floatingPositions) {
    store.set('currencyInfo.floatingPositions', floatingPositions);
  },

  getLocalDatabaseInfo() {
    return store.get('databaseInfo');
  },

  getLocalBusinessInfo() {
    return store.get('businessInfo');
  },

  setLocalBusinessInfo(businessInfo) {
    store.set('businessInfo', businessInfo);
  },
};

export default LocalConfiguration;
