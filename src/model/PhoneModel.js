const {Schema} = window.require('mongoose')

const phoneSchema = new Schema({
    description: String,
    number: String
})

export { phoneSchema }