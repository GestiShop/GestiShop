/* eslint-disable import/prefer-default-export */
const { Schema } = window.require('mongoose');

const emailSchema = new Schema({
  description: String,
  address: String,
});

export { emailSchema };
