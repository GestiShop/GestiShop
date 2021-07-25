import { Schema, Types, model } from 'mongoose';
import { phoneSchema } from './PhoneModel';
import { emailSchema } from './EmailModel';
import { addressSchema } from './AddressModel';
import { eFactSchema } from './EFactModel';

const providerSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  contactData: {
    name: String,
    phone: phoneSchema,
    email: emailSchema,
  },
  fiscalData: {
    name: String,
    nif: String,
    address: addressSchema,
  },
  postalData: {
    name: String,
    email: emailSchema,
    address: addressSchema,
  },
  tributationData: {
    retentionPercentage: Number,
    personalDiscount: Number,
  },
  eFactData: eFactSchema,
  bills: [{ type: Types.ObjectId, ref: 'ProviderBill' }],
});

const Provider = model('Provider', providerSchema, 'providers');

export { providerSchema, Provider };
