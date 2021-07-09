import { phoneSchema } from './PhoneModel';
import { emailSchema } from './EmailModel';
import { addressSchema } from './AddressModel';
import { eFactSchema } from './EFactModel';

const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  reference: String,
  contactData: {
    name: String,
    mainPhone: { type: mongoose.Types.ObjectId, ref: 'Client.phones' },
    phones: [phoneSchema],
    mainEmail: { type: mongoose.Types.ObjectId, ref: 'Client.emails' },
    emails: [emailSchema],
  },
  fiscalData: {
    name: String,
    nif: String,
    address: addressSchema,
  },
  postalData: {
    name: String,
    email: { type: mongoose.Types.ObjectId, ref: 'Client.emails' },
    address: addressSchema,
  },
  tributationData: {
    retentionPercentage: Number,
    personalDiscount: Number,
  },
  eFactData: eFactSchema,
  bills: [{ type: mongoose.Types.ObjectId, ref: 'ClientBill' }],
});

const Client = mongoose.model('Client', clientSchema, 'clients');

export { clientSchema, Client };
