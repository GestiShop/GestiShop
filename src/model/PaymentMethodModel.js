import mongoose, { Schema } from 'mongoose'

const paymentMethodSchema = new Schema({
    reference: String,
    name: String
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

export { paymentMethodSchema, PaymentMethod }