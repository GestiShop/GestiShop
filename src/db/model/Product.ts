import { Schema, Types, model } from 'mongoose';

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

const Product = model('Product', productSchema, 'products');

export { productSchema, Product };
