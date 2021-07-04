import { Schema } from 'mongoose'

const eFactSchema = new Schema({
    accountingOfficeCode: String,
    accountingOfficeName: String,
    managementBodyCode: String,
    managementBodyName: String,
    processingUnitCode: String,
    processingUnitName: String,
    electronicBillingCode: String
})

export { eFactSchema }