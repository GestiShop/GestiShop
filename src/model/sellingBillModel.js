import addressSchema from './addressModel'
import attributeSchema from './attributeModel'
import expirationPeriodSchema from './expirationPeriodModel'

import mongoose from 'mongoose'

const {Schema} = mongoose

const billSchema = new Schema({
    billLetter: String,
    billNumber: String,
    date: Date,
    entityData: {
        entity: {type: mongoose.Types.ObjectId},
        fiscalData: {
            name: String,
            nif: String,
            address: addressSchema
        },
        paymentData: {
            method: Object,
            expirationPeriod: expirationPeriodSchema,
            expirationDate: Date
        }
    },
    products: [
        {
            reference: String,
            name: String,
            attributes: [attributeSchema],
            basePricePerUnit: Number,
            quantity: Number,
            unitType: String,
            discountPercentage: Number,
            taxPercentage: Number,
            pvp: Number
        }
    ],
    taxesSummary: [
        {
            basePrice: Number,
            taxPercentage: Number,
            taxTotalPrice: Number
        }
    ],
    totalBasePrice: Number,
    totalPVP: Number,
    notes: String,
    generalDiscount: Number
})

module.exports = billSchema