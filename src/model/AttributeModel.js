const mongoose = window.require('mongoose')
const {Schema} = mongoose

const attributeSchema = new Schema({
    name: String,
    value: String
})

const Attribute = mongoose.model('Attribute', attributeSchema, 'attributes')

export { attributeSchema, Attribute }