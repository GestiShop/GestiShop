import mongoose, { Schema } from 'mongoose'

const taxPercentageSchema = new Schema({
    reference: String,
    percentage: Number
})

const TaxPercentage = mongoose.model('TaxPercentage', taxPercentageSchema)

export { taxPercentageSchema, TaxPercentage }