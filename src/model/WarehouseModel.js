import mongoose, { Schema } from 'mongoose'
import { addressSchema } from './AddressModel'

const warehouseSchema = new Schema({
    reference: String,
    description: String,
    address: addressSchema
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema)

export { warehouseSchema, Warehouse }