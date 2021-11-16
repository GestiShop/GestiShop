/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { ProviderBill } from './model/Bill';
import { addBill, removeBill } from './ProviderHelper';
import { incrementStock } from './ProductHelper';

const addProviderBill = (providerBill, errorCallback, resultCallback) => {
  let hasErrors = false;
  let productsViewed = 0;

  const dbProviderBill = new ProviderBill(providerBill);
  dbProviderBill.save((err, bill) => {
    if (err) {
      errorCallback(err);
    } else {
      addBill(
        providerBill.entityData.entity,
        bill.id,
        errorCallback,
        (docs) => {
          providerBill.products.forEach((product) => {
            incrementStock(
              product.product,
              product.quantity,
              () => {
                hasErrors = true;
              },
              () => {
                ++productsViewed;
              }
            );
          });
        }
      );
    }
  });

  while (!hasErrors && productsViewed < providerBill.products.length - 1) {}

  if (hasErrors) {
    errorCallback();
  } else {
    resultCallback();
  }
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
              errorCallback,
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
