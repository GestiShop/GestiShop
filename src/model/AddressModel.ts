/* eslint-disable import/prefer-default-export */
const { Schema } = window.require('mongoose');

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
  state: { type: String, required: true },
  country: { type: String, required: true },
});

export { addressSchema };
