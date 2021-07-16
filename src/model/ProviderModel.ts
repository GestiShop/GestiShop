import { Schema, Types, model } from 'mongoose';
import { phoneSchema } from './PhoneModel';
import { emailSchema } from './EmailModel';
import { addressSchema } from './AddressModel';
import { eFactSchema } from './EFactModel';

const providerSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  contactData: {
    name: String,
    mainPhone: { type: Types.ObjectId, ref: 'Provider.phones' },
    phones: [phoneSchema],
    mainEmail: { type: Types.ObjectId, ref: 'Provider.emails' },
    emails: [emailSchema],
  },
  fiscalData: {
    name: String,
    nif: String,
    address: addressSchema,
  },
  postalData: {
    name: String,
    email: { type: Types.ObjectId, ref: 'Provider.emails' },
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
