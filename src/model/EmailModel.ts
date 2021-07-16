/* eslint-disable import/prefer-default-export */
import { Schema } from 'mongoose';

const emailSchema = new Schema({
  description: String,
  address: { type: String, required: true },
});

export { emailSchema };
