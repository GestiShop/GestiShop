import { Schema, model } from 'mongoose';
import { addressSchema } from './AddressModel';

const warehouseSchema = new Schema({
  reference: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  address: { type: addressSchema, required: true },
});

const Warehouse = model('Warehouse', warehouseSchema, 'warehouses');

export { warehouseSchema, Warehouse };
