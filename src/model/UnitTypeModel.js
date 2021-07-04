import mongoose, { Schema } from 'mongoose'

const unitTypeSchema = new Schema({
    reference: String,
    unit: String
})

const UnitType = mongoose.model('UnitType', unitTypeSchema)

export { unitTypeSchema, UnitType }