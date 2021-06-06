import mongoose from 'mongoose'

const {Schema} = mongoose

const unitTypeSchema = new Schema({
    unit: String
})

const UnitType = mongoose.model('UnitType', unitTypeSchema)

module.exports = {unitTypeSchema, UnitType}