import { addressSchema } from './AddressModel';
import { paymentMethodSchema } from './PaymentMethodModel';

const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
  billNumber: Number,
  date: Date,
  entityData: {
    entity: { type: mongoose.Types.ObjectId },
    fiscalData: {
      name: String,
      nif: String,
      address: addressSchema,
    },
  },
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product' },
      reference: String,
      name: String,
      basePrice: Number,
      unitType: String,
      discountPercentage: Number,
      taxPercentage: Number,
      quantity: Number,
    },
  ],
  notes: String,
  generalDiscount: Number,
  paymentData: {
    method: paymentMethodSchema,
    expirationDate: Date,
  },
  isPaid: Boolean,
});

const ClientBill = mongoose.model('ClientBill', billSchema, 'clientBills');
const ProviderBill = mongoose.model(
  'ProviderBill',
  billSchema,
  'providerBills'
);

export { billSchema, ClientBill, ProviderBill };
