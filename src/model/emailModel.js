import mongoose from 'mongoose'

const {Schema} = mongoose

const emailSchema = new Schema({
    description: String,
    address: String
})

module.exports = emailSchema