/* eslint-disable import/prefer-default-export */
const { Schema } = window.require('mongoose');

const addressSchema = new Schema({
  roadType: String,
  street: String,
  number: String,
  floor: String,
  door: String,
  extra: String,
  zipCode: String,
  city: String,
  province: String,
  state: String,
  country: String,
});

export { addressSchema };
