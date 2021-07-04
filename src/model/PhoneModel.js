import { Schema } from 'mongoose'

const phoneSchema = new Schema({
    description: String,
    number: String
})

export { phoneSchema }