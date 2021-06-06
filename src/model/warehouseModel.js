import addressSchema from './addressModel'

import mongoose from 'mongoose'

const {Schema} = mongoose

const warehouseSchema = new Schema({
    reference: String,
    description: String,
    address: addressSchema
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema)

module.exports = {warehouseSchema, Warehouse}