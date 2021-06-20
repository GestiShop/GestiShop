import attributeSchema from './attributeModel'
import mongoose from 'mongoose'

const {Schema} = mongoose

const productSchema = new Schema(
    {
        reference: String,
        name: String,
        attributes: [attributeSchema],
        basePricePerUnit: Number,
        unitType: String,
        discountPercentage: Number,
        taxPercentage: {type: mongoose.Types.ObjectId, ref: 'TaxPercentage'},
        pvp: Number,
        warehouse: {type: mongoose.Types.ObjectId, ref: 'Warehouse'}
    })

const Product = mongoose.model('Product', productSchema)

module.exports = {productSchema, Product}