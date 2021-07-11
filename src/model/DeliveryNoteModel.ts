import { addressSchema } from './AddressModel';

const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const deliveryNoteSchema = new Schema({
  deliveryNoteNumber: {
    type: Number,
    unique: true,
    required: true,
    dropDups: true,
  },
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
  associatedBill: { type: mongoose.Types.ObjectId },
});

const ClientDeliveryNote = mongoose.model(
  'ClientDeliveryNote',
  deliveryNoteSchema,
  'clientDeliveryNotes'
);
const ProviderDeliveryNote = mongoose.model(
  'ProviderDeliveryNote',
  deliveryNoteSchema,
  'providerDeliveryNotes'
);

export { deliveryNoteSchema, ClientDeliveryNote, ProviderDeliveryNote };
