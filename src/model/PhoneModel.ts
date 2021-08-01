/* eslint-disable import/prefer-default-export */
import { Schema } from 'mongoose';

const phoneSchema = new Schema({
  description: String,
  phone: { type: String, required: true },
});

export { phoneSchema };
