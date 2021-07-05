const mongoose = window.require('mongoose')
const {Schema} = mongoose

const unitTypeSchema = new Schema({
    reference: String,
    unit: String
})

const UnitType = mongoose.model('UnitType', unitTypeSchema, 'unitTypes')

export { unitTypeSchema, UnitType }