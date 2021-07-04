import { Schema } from 'mongoose'

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
    state: String,
    country: String
})

export { addressSchema }