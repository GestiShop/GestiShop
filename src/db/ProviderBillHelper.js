/* eslint-disable no-underscore-dangle */
import { ProviderBill } from '../model/BillModel';
import { addBill, removeBill } from './ProviderHelper';

const addProviderBill = (providerBill, errorCallback, resultCallback) => {
  const dbProviderBill = new ProviderBill(providerBill);
  dbProviderBill.save((err, bill) => {
    if (err) {
      errorCallback(err);
    } else {
      addBill(
        providerBill.entityData.entity,
        bill.id,
        (error) => {
          errorCallback(error);
        },
        (docs) => {
          resultCallback();
        }
      );
    }
  });
};

const fetchProviderBills = (errorCallback, resultCallback) => {
  return ProviderBill.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateProviderBill = (providerBill, errorCallback, resultCallback) => {
  const query = { _id: providerBill._id };
  return ProviderBill.findOneAndUpdate(query, providerBill, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteProviderBills = (ids, errorCallback, resultCallback) => {
  ids.forEach((billId) => {
    const query = { _id: billId };
    ProviderBill.findById(query, (err1, bill) => {
      if (err1) {
        errorCallback(err1);
      } else {
        ProviderBill.deleteOne(query, (err2) => {
          if (err2) {
            errorCallback(err2);
          } else {
            removeBill(
              bill.entityData.entity,
              billId,
              (err3) => {
                errorCallback(err3);
              },
              (docs) => {
                resultCallback();
              }
            );
          }
        });
      }
    });
  });
};

export {
  addProviderBill,
  fetchProviderBills,
  updateProviderBill,
  deleteProviderBills,
};
