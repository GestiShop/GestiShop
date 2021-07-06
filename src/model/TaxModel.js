const mongoose = window.require('mongoose')
const {Schema} = mongoose

const taxSchema = new Schema({
    reference: String,
    percentage: Number
})

const Tax = mongoose.model('Tax', taxSchema, 'taxes')

export { taxSchema, Tax }