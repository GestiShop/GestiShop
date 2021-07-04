import mongoose, { Schema } from 'mongoose'
import { addressSchema } from './AddressModel'

const deliveryNoteSchema = new Schema({
    deliveryNoteNumber: Number,
    date: Date,
    entityData: {
        entity: {type: mongoose.Types.ObjectId},
        fiscalData: {
            name: String,
            nif: String,
            address: addressSchema
        }
    },
    products: [
        {
            product: {type: mongoose.Types.ObjectId, ref: 'Product'},
            reference: String,
            name: String,
            basePrice: Number,
            unitType: String,
            discountPercentage: Number,
            taxPercentage: Number,
            quantity: Number,
        }
    ],
    notes: String,
    generalDiscount: Number,
    associatedBill: {type: mongoose.Types.ObjectId}
})

const ClientDeliveryNote = mongoose.model('ClientDeliveryNote', deliveryNoteSchema)
const ProviderDeliveryNote = mongoose.model('ProviderDeliveryNote', deliveryNoteSchema)

export { deliveryNoteSchema, ClientDeliveryNote, ProviderDeliveryNote }