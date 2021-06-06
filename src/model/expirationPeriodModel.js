import mongoose from 'mongoose'

const {Schema} = mongoose

const expirationPeriodSchema = new Schema({
    reference: String,
    description: String,
    unitCount: Number,
    unitType: String
})

const ExpirationPeriod = mongoose.model('ExpirationPeriod', expirationPeriodSchema)

module.exports = {expirationPeriodSchema, ExpirationPeriod}