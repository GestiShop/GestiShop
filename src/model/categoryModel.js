import mongoose from 'mongoose'

const {Schema} = mongoose

const categorySchema = new Schema({
    reference: String,
    name: String,
    parent: {type: mongoose.Types.ObjectId, ref: 'Category'}
})

const Category = mongoose.model('Category', categorySchema)

module.exports = {categorySchema, Category}