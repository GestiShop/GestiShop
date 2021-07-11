/* eslint-disable import/prefer-default-export */
const { Schema } = window.require('mongoose');

const phoneSchema = new Schema({
  description: String,
  number: { type: String, required: true },
});

export { phoneSchema };
