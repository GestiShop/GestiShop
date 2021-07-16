import { Schema, Types, model } from 'mongoose';
import { addressSchema } from './AddressModel';

const budgetSchema = new Schema({
  budgetNumber: { type: Number, unique: true, required: true, dropDups: true },
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
  generalDiscount: Number,
  associatedBill: { type: Types.ObjectId },
});

const ClientBudget = model('ClientBudget', budgetSchema, 'clientBudgets');
const ProviderBudget = model('ProviderBudget', budgetSchema, 'providerBudgets');

export { budgetSchema, ClientBudget, ProviderBudget };
