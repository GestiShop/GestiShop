import { Types, Schema, model } from 'mongoose';
import { addressSchema } from './AddressModel';
import { paymentMethodSchema } from './PaymentMethodModel';

const billSchema = new Schema({
  billNumber: { type: Number, unique: true, required: true, dropDups: true },
  date: Date,
  entityData: {
    entity: { type: Types.ObjectId },
    fiscalData: {
      name: String,
      nif: String,
      address: addressSchema,
    },
  },
  products: [
    {
      product: { type: Types.ObjectId, ref: 'Product' },
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
  basePrice: Number,
  generalDiscount: Number,
  pvp: Number,
  paymentData: {
    method: paymentMethodSchema,
    expirationDate: Date,
  },
  isPaid: Boolean,
});

const ClientBill = model('ClientBill', billSchema, 'clientBills');
const ProviderBill = model('ProviderBill', billSchema, 'providerBills');

export { billSchema, ClientBill, ProviderBill };
