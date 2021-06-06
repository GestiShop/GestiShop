import mongoose from 'mongoose'

const {Schema} = mongoose

const phoneSchema = new Schema({
    description: String,
    number: String
})

module.exports = phoneSchema