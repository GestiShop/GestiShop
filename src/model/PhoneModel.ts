/* eslint-disable import/prefer-default-export */
import { Schema } from 'mongoose';

const phoneSchema = new Schema({
  description: String,
  number: { type: String, required: true },
});

export { phoneSchema };
