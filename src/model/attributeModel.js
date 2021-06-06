import mongoose from 'mongoose'

const {Schema} = mongoose

const attributeSchema = new Schema({
    name: String,
    value: String,
    image: Buffer
})

const Attribute = mongoose.model('Attribute', attributeSchema)

module.exports = {attributeSchema, Attribute}