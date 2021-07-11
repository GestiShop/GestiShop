import { addressSchema } from './AddressModel';

const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const warehouseSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  description: { type: Number, required: true },
  address: { type: addressSchema, required: true },
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'warehouses');

export { warehouseSchema, Warehouse };
