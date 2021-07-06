const mongoose = window.require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    reference: String,
    name: String,
    basePrice: Number,
    unitType: {type: mongoose.Types.ObjectId, ref: 'UnitType'},
    discountPercentage: Number,
    taxPercentage: {type: mongoose.Types.ObjectId, ref: 'Tax'},
    stock: Number,
    warehouse: {type: mongoose.Types.ObjectId, ref: 'Warehouse'},
    categories: [{type: mongoose.Types.ObjectId, ref: 'Category'}],
    minStock: Number,
    stockAlert: Boolean,
    visible: Boolean
})

const Product = mongoose.model('Product', productSchema, 'products')

export { productSchema, Product }