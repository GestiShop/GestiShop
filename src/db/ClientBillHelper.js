/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { ClientBill } from '../model/BillModel';
import { addBill, removeBill } from './ClientHelper';
import { decrementStock } from './ProductHelper';

const addClientBill = (clientBill, errorCallback, resultCallback) => {
  let hasErrors = false;
  let productsViewed = 0;

  const dbClientBill = new ClientBill(clientBill);
  dbClientBill.save((err1, bill) => {
    if (err1) {
      errorCallback(err1);
    } else {
      addBill(clientBill.entityData.entity, bill.id, errorCallback, (docs) => {
        clientBill.products.forEach((product) => {
          decrementStock(
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
      });
    }
  });

  while (!hasErrors && productsViewed < clientBill.products.length - 1) {}

  if (hasErrors) {
    errorCallback();
  } else {
    resultCallback();
  }
};

const fetchClientBills = (errorCallback, resultCallback) => {
  return ClientBill.find({}, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const updateClientBill = (clientBill, errorCallback, resultCallback) => {
  const query = { _id: clientBill._id };
  return ClientBill.findOneAndUpdate(query, clientBill, (err, docs) => {
    if (err) {
      errorCallback(err);
    } else {
      resultCallback(docs);
    }
  });
};

const deleteClientBills = (ids, errorCallback, resultCallback) => {
  ids.forEach((billId) => {
    const query = { _id: billId };
    ClientBill.findById(query, (err1, bill) => {
      if (err1) {
        errorCallback(err1);
      } else {
        ClientBill.deleteOne(query, (err2) => {
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

export { addClientBill, fetchClientBills, updateClientBill, deleteClientBills };
