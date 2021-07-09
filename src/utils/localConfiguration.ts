import Store from 'electron-store';

const schema = {
  lang: {},
  currencyInfo: {},
  databaseInfo: {},
  businessInfo: {},
};

const store = new Store({ schema });

const LocalConfiguration = {
  getDefaultLang() {
    return store.get('lang');
  },

  getDefaultCurrency() {
    return store.get('currencyInfo');
  },

  getDefaultDatabaseInfo() {
    return store.get('databaseInfo');
  },

  getDefaultBusinessInfo() {
    return store.get('businessInfo');
  },

  setDefaultConfigurationInfo(configuration) {
    store.set('lang', configuration.lang);
    store.set('currencyInfo', configuration.currencyInfo);
    store.set('databaseInfo', configuration.databaseInfo);
    store.set('businessInfo', configuration.businessInfo);
  },
};

export default LocalConfiguration;
