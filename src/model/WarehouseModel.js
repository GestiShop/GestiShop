const mongoose = window.require('mongoose')
const {Schema} = mongoose
import { addressSchema } from './AddressModel'

const warehouseSchema = new Schema({
    reference: String,
    description: String,
    address: addressSchema
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'warehouses')

export { warehouseSchema, Warehouse }