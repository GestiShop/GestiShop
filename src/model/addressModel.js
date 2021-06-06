import mongoose from 'mongoose'

const {Schema} = mongoose

const addressSchema = new Schema({
    roadType: String,
    street: String,
    number: String,
    floor: String,
    door: String,
    extra: String,
    zipCode: String,
    city: String,
    province: String,
    country: String
})

module.exports = addressSchema