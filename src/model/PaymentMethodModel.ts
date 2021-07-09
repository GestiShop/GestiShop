const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  reference: String,
  name: String,
});

const PaymentMethod = mongoose.model(
  'PaymentMethod',
  paymentMethodSchema,
  'paymentMethods'
);

export { paymentMethodSchema, PaymentMethod };
