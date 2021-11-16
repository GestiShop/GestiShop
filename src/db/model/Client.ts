import { Schema, Types, model } from 'mongoose';
import { phoneSchema } from './Phone';
import { emailSchema } from './Email';
import { addressSchema } from './Address';
import { eFactSchema } from './EFact';

const clientSchema = new Schema({
  reference: { type: String, unique: true, required: true },
  contactData: {
    name: { type: String, required: true },
    phone: phoneSchema,
    email: emailSchema,
  },
  fiscalData: {
    name: { type: String, required: true },
    nif: { type: String, required: true },
    address: addressSchema,
  },
  postalData: {
    name: { type: String, required: true },
    email: emailSchema,
    address: addressSchema,
  },
  tributationData: {
    retentionPercentage: { type: Number, required: true, default: 0.0 },
    personalDiscount: { type: Number, required: true, default: 0.0 },
  },
  eFactData: eFactSchema,
  bills: [{ type: Types.ObjectId, ref: 'ClientBill' }],
});

const Client = model('Client', clientSchema, 'clients');

export { clientSchema, Client };
