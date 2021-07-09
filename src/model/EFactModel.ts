/* eslint-disable import/prefer-default-export */
const { Schema } = window.require('mongoose');

const eFactSchema = new Schema({
  accountingOfficeCode: String,
  accountingOfficeName: String,
  managementBodyCode: String,
  managementBodyName: String,
  processingUnitCode: String,
  processingUnitName: String,
  electronicBillingCode: String,
});

export { eFactSchema };
