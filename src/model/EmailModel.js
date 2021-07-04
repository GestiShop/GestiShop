import { Schema } from 'mongoose'

const emailSchema = new Schema({
    description: String,
    address: String
})

export { emailSchema }