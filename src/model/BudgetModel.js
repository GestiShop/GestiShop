import mongoose, { Schema } from 'mongoose'
import { addressSchema } from './AddressModel'

const budgetSchema = new Schema({
    budgetNumber: Number,
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

const ClientBudget = mongoose.model('ClientBudget', budgetSchema)
const ProviderBudget = mongoose.model('ProviderBudget', budgetSchema)

export { budgetSchema, ClientBudget, ProviderBudget }