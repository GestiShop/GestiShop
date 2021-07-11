const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
});

const PaymentMethod = mongoose.model(
  'PaymentMethod',
  paymentMethodSchema,
  'paymentMethods'
);

export { paymentMethodSchema, PaymentMethod };
