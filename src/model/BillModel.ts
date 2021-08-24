import { Types, Schema, model } from 'mongoose';
import { addressSchema } from './AddressModel';

const billSchema = new Schema({
  billNumberPreamble: { type: String, default: '' },
  billNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  entityData: {
    entity: { type: Types.ObjectId, required: true },
    fiscalData: {
      name: { type: String, required: true },
      nif: { type: String, required: true },
      address: addressSchema,
    },
  },
  products: [
    {
      product: { type: Types.ObjectId, ref: 'Product', required: true },
      reference: { type: String, required: true },
      name: { type: String, required: true },
      basePricePerUnit: { type: Number, required: true },
      unitType: { type: String, required: true },
      discountPercentage: { type: Number, required: true },
      taxPercentage: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  notes: String,
  basePrice: { type: Number, required: true },
  generalDiscount: { type: Number, required: true },
  pvp: { type: Number, required: true },
  paymentData: {
    method: { type: String, required: true },
    expirationDate: { type: Date, required: true },
  },
  isPaid: { type: Boolean, required: true },
});

// TODO: FIX THIS
// billSchema.index({ billNumberPreamble: 1, billNumber: 1 }, { unique: true });

const ClientBill = model('ClientBill', billSchema, 'clientBills');
const ProviderBill = model('ProviderBill', billSchema, 'providerBills');

export { billSchema, ClientBill, ProviderBill };
