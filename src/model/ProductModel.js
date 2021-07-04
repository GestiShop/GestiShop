import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    reference: String,
    name: String,
    attributes: [{type: mongoose.Types.ObjectId, ref: 'Attribute'}],
    basePrice: Number,
    unitType: {type: mongoose.Types.ObjectId, ref: 'UnitType'},
    discountPercentage: Number,
    taxPercentage: {type: mongoose.Types.ObjectId, ref: 'TaxPercentage'},
    quantity: Number,
    warehouse: {type: mongoose.Types.ObjectId, ref: 'Warehouse'},
    categories: [{type: mongoose.Types.ObjectId, ref: 'Category'}],
    minStock: Number,
    stockAlert: Boolean,
    visible: Boolean
})

const Product = mongoose.model('Product', productSchema)

export { productSchema, Product }