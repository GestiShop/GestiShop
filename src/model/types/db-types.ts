import { Schema, model, Types } from 'mongoose';

/* ----- ----- PHONE ----- ----- */
const phoneSchema = new Schema({
  description: String,
  phone: { type: String, required: true },
});

/* ----- ----- EMAIL ----- ----- */
const emailSchema = new Schema({
  description: String,
  email: { type: String, required: true },
});

/* ----- ----- ADDRESS ----- ----- */
const addressSchema = new Schema({
  roadType: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  floor: String,
  door: String,
  extra: String,
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  state: String,
  country: { type: String, required: true },
});

/* ----- ----- E-FACT ----- ----- */
const eFactSchema = new Schema({
  accountingOfficeCode: String,
  accountingOfficeName: String,
  managementBodyCode: String,
  managementBodyName: String,
  processingUnitCode: String,
  processingUnitName: String,
  electronicBillingCode: String,
});

/* ----- ----- EVENT ----- ----- */
const eventSchema = new Schema<Event>({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  title: { type: String, required: true },
  description: String,
  allDay: Boolean,
  colorCode: String,
});

export const DBEvent = model<Event>('Event', eventSchema, 'events');

/* ----- ----- BILL ----- ----- */
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

billSchema.index({ billNumberPreamble: 1, billNumber: 1 }, { unique: true });

export const DBClientBill = model('ClientBill', billSchema, 'clientBills');
export const DBProviderBill = model(
  'ProviderBill',
  billSchema,
  'providerBills'
);

/* ----- ----- BUDGET ----- ----- */
const budgetSchema = new Schema({
  budgetNumberPreamble: { type: String, default: '' },
  budgetNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
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

budgetSchema.index(
  { budgetNumberPreamble: 1, budgetNumber: 1 },
  { unique: true }
);

export const DBClientBudget = model(
  'ClientBudget',
  budgetSchema,
  'clientBudgets'
);
export const DBProviderBudget = model(
  'ProviderBudget',
  budgetSchema,
  'providerBudgets'
);

/* ----- ----- DELIVERY NOTE ----- ----- */
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

export const DBClientDeliveryNote = model(
  'ClientDeliveryNote',
  deliveryNoteSchema,
  'clientDeliveryNotes'
);
export const DBProviderDeliveryNote = model(
  'ProviderDeliveryNote',
  deliveryNoteSchema,
  'providerDeliveryNotes'
);

/* ----- ----- CATEGORY ----- ----- */
const categorySchema = new Schema({
  reference: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: 'Category' },
});

export const DBCategory = model('Category', categorySchema, 'categories');

/* ----- ----- CLIENT ----- ----- */
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

export const DBClient = model('Client', clientSchema, 'clients');

/* ----- ----- PROVIDER ----- ----- */
const providerSchema = new Schema({
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
  bills: [{ type: Types.ObjectId, ref: 'ProviderBill' }],
});

export const DBProvider = model('Provider', providerSchema, 'providers');

/* ----- ----- PRODUCT ----- ----- */
const productSchema = new Schema({
  reference: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: String,
  buyingInfo: {
    basePrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true, default: 0.0 },
    taxPercentage: { type: Types.ObjectId, ref: 'Tax', required: true },
  },
  sellingInfo: {
    basePrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true, default: 0.0 },
    taxPercentage: { type: Types.ObjectId, ref: 'Tax', required: true },
  },
  unitType: { type: Types.ObjectId, ref: 'UnitType', required: true },
  stock: { type: Number, required: true },
  warehouse: {
    type: Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
  categories: [{ type: Types.ObjectId, ref: 'Category' }],
  minStock: Number,
  stockAlert: { type: Boolean, required: true },
});

export const DBProduct = model('Product', productSchema, 'products');

/* ----- ----- TAX ----- ----- */
const taxSchema = new Schema({
  reference: { type: String, unique: true, required: true },
  percentage: { type: Number, required: true },
});

export const DBTax = model('Tax', taxSchema, 'taxes');

/* ----- ----- UNIT TYPE ----- ----- */
const unitTypeSchema = new Schema({
  reference: { type: String, unique: true, required: true },
  unit: { type: String, required: true },
});

export const DBUnitType = model('UnitType', unitTypeSchema, 'unitTypes');

/* ----- ----- PROVIDER ----- ----- */
const warehouseSchema = new Schema({
  reference: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  address: { type: addressSchema, required: true },
});

export const DBWarehouse = model('Warehouse', warehouseSchema, 'warehouses');
