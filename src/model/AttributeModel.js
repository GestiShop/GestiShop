import mongoose, { Schema } from 'mongoose'

const attributeSchema = new Schema({
    name: String,
    value: String
})

const Attribute = mongoose.model('Attribute', attributeSchema)

export { attributeSchema, Attribute }