const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  unitType: { type: mongoose.Types.ObjectId, ref: 'UnitType', required: true },
  discountPercentage: { type: Number, required: true, default: 0.0 },
  taxPercentage: { type: mongoose.Types.ObjectId, ref: 'Tax', required: true },
  stock: { type: Number, required: true },
  warehouse: {
    type: mongoose.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
  categories: [
    { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  ],
  minStock: Number,
  stockAlert: { type: Boolean, required: true },
  visible: { type: Boolean, required: true },
});

const Product = mongoose.model('Product', productSchema, 'products');

export { productSchema, Product };
