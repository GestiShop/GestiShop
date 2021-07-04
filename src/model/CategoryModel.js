import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    reference: String,
    name: String,
    parent: {type: mongoose.Types.ObjectId, ref: 'Category'}
})

const Category = mongoose.model('Category', categorySchema)

export { categorySchema, Category }