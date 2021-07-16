import { Schema, model } from 'mongoose';

const paymentMethodSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
});

const PaymentMethod = model(
  'PaymentMethod',
  paymentMethodSchema,
  'paymentMethods'
);

export { paymentMethodSchema, PaymentMethod };
