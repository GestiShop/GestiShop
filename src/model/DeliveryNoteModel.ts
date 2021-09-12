import { Schema, Types, model } from 'mongoose';
import { addressSchema } from './AddressModel';

const deliveryNoteSchema = new Schema({
  deliveryNoteNumberPreamble: { type: String, default: '' },
  deliveryNoteNumber: { type: Number, required: true },
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
  associatedBill: { type: Types.ObjectId },
});

deliveryNoteSchema.index(
  { deliveryNoteNumberPreamble: 1, deliveryNoteNumber: 1 },
  { unique: true }
);

const ClientDeliveryNote = model(
  'ClientDeliveryNote',
  deliveryNoteSchema,
  'clientDeliveryNotes'
);
const ProviderDeliveryNote = model(
  'ProviderDeliveryNote',
  deliveryNoteSchema,
  'providerDeliveryNotes'
);

export { deliveryNoteSchema, ClientDeliveryNote, ProviderDeliveryNote };
