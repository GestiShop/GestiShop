/* eslint-disable import/prefer-default-export */
import { Schema } from 'mongoose';

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

export { addressSchema };
