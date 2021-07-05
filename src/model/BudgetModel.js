const mongoose = window.require('mongoose')
const {Schema} = mongoose
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

const ClientBudget = mongoose.model('ClientBudget', budgetSchema, 'clientBudgets')
const ProviderBudget = mongoose.model('ProviderBudget', budgetSchema, 'providerBudgets')

export { budgetSchema, ClientBudget, ProviderBudget }