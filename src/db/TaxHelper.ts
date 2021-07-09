import { Tax } from '../model/TaxModel';

const addTax = (
  tax: any,
  errorCallback: (arg0: any) => void,
  resultCallback: () => void
) => {
  const dbTax = new Tax(tax);
  dbTax.save((err: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback();
    }
  });
};

const fetchTaxes = (
  errorCallback: (arg0: any) => void,
  resultCallback: (arg0: any) => void
) => {
  return Tax.find({}, (err: any, docs: any) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

export { addTax, fetchTaxes };
