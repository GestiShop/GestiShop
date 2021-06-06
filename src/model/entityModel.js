import phoneSchema from './phoneModel'
import emailSchema from './emailModel'
import addressSchema from './addressModel'
import billSchema from './sellingBillModel'

import mongoose from 'mongoose'

const {Schema} = mongoose

const entitySchema = new Schema({
    reference: String,
    contactData: {
        name: String,
        mainPhone: {type: mongoose.Types.ObjectId, ref: 'Entity.phones'},
        phones: [phoneSchema],
        mainEmail: {type: mongoose.Types.ObjectId, ref: 'Entity.emails'},
        emails: [emailSchema]
    },
    fiscalData: {
        name: String,
        nif: String,
        address: addressSchema
    },
    postalData: {
        name: String,
        email: {type: mongoose.Types.ObjectId, ref: 'Entity.emails'},
        address: addressSchema
    },
    paymentData: {
        methods: [],
        expirationPeriod: {type: mongoose.Types.ObjectId, ref: 'ExpirationPeriod'}
    },
    tributationData: {
        retentionPercentage: Number,
        priceRange: {type: mongoose.Types.ObjectId, ref: 'PriceRange'},
        additionalDiscount: Number
    },
    eFactData: Object,
    bills: [billSchema]
})

const Client = mongoose.model('Client', entitySchema)
const Provider = mongoose.model('Provider', entitySchema)

module.exports = {entitySchema, Client, Provider}