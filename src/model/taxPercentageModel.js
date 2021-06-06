import mongoose from 'mongoose'

const {Schema} = mongoose

const taxPercentageSchema = new Schema({
    reference: String,
    percentage: Number
})

const TaxPercentage = mongoose.model('TaxPercentage', taxPercentageSchema)

module.exports = {taxPercentageSchema, TaxPercentage}