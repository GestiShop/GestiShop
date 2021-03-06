import { phoneSchema } from './PhoneModel';
import { emailSchema } from './EmailModel';
import { addressSchema } from './AddressModel';
import { eFactSchema } from './EFactModel';

const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const providerSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  contactData: {
    name: String,
    mainPhone: { type: mongoose.Types.ObjectId, ref: 'Provider.phones' },
    phones: [phoneSchema],
    mainEmail: { type: mongoose.Types.ObjectId, ref: 'Provider.emails' },
    emails: [emailSchema],
  },
  fiscalData: {
    name: String,
    nif: String,
    address: addressSchema,
  },
  postalData: {
    name: String,
    email: { type: mongoose.Types.ObjectId, ref: 'Provider.emails' },
    address: addressSchema,
  },
  tributationData: {
    retentionPercentage: Number,
    personalDiscount: Number,
  },
  eFactData: eFactSchema,
  bills: [{ type: mongoose.Types.ObjectId, ref: 'ProviderBill' }],
});

const Provider = mongoose.model('Provider', providerSchema, 'providers');

export { providerSchema, Provider };
