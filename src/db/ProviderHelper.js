/* eslint-disable no-underscore-dangle */
import { Provider } from '../model/ProviderModel';

const addProvider = (provider, errorCallback, resultCallback) => {
  const dbProvider = new Provider(provider);
  dbProvider.save((err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchProviders = (errorCallback, resultCallback) => {
  return Provider.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateProvider = (provider, errorCallback, resultCallback) => {
  const query = { _id: provider._id };
  return Provider.findOneAndUpdate(query, provider, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteProviders = (providers, errorCallback, resultCallback) => {
  const query = { _id: providers.map((x) => x._id) };
  return Provider.deleteMany(query, (err) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

export { addProvider, fetchProviders, updateProvider, deleteProviders };
