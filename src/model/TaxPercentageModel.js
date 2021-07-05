const mongoose = window.require('mongoose')
const {Schema} = mongoose

const taxPercentageSchema = new Schema({
    reference: String,
    percentage: Number
})

const TaxPercentage = mongoose.model('TaxPercentage', taxPercentageSchema, 'taxPercentages')

export { taxPercentageSchema, TaxPercentage }