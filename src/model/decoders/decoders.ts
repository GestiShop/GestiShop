import * as D from 'schemawax';
import { DecoderError } from 'schemawax';
import { Types } from 'mongoose';

const objectIdDecoder = D.unknown.andThen((objectId) => {
  if (objectId instanceof Types.ObjectId) {
    return objectId as Types.ObjectId;
  }
  throw new DecoderError('Error decoding ObjectId.');
});

export const addressDecoder = D.object({
  required: {
    roadType: D.string,
    street: D.string,
    number: D.string,
    zipCode: D.string,
    city: D.string,
    province: D.string,
    country: D.string,
  },
  optional: {
    floor: D.string,
    door: D.string,
    extra: D.string,
    state: D.string,
  },
});

export const phoneDecoder = D.object({
  required: {
    phone: D.string,
  },
  optional: {
    description: D.string,
  },
});

export const emailDecoder = D.object({
  required: {
    email: D.string,
  },
  optional: {
    description: D.string,
  },
});

export const fiscalDataDecoder = D.object({
  required: {
    name: D.string,
    nif: D.string,
    address: addressDecoder,
  },
});

export const contactDataDecoder = D.object({
  required: {
    name: D.string,
  },
  optional: {
    phone: phoneDecoder,
    email: emailDecoder,
  },
});

export const postalDataDecoder = D.object({
  required: {
    name: D.string,
  },
  optional: {
    email: emailDecoder,
    address: addressDecoder,
  },
});

export const tributationDataDecoder = D.object({
  required: {
    retentionPercentage: D.number,
    personalDiscount: D.number,
  },
});

export const eFactDataDecoder = D.object({
  required: {
    accountingOfficeCode: D.string,
    accountingOfficeName: D.string,
    managementBodyCode: D.string,
    managementBodyName: D.string,
    processingUnitCode: D.string,
    processingUnitName: D.string,
    electronicBillingCode: D.string,
  },
});

export const taxDecoder = D.object({
  required: {
    reference: D.string,
    percentage: D.number,
  },
  optional: {
    _id: objectIdDecoder,
  },
}).andThen((decodedTax) => {
  return {
    id: decodedTax._id,
    reference: decodedTax.reference,
    percentage: decodedTax.percentage,
  };
});

export const unitTypeDecoder = D.object({
  required: {
    reference: D.string,
    unit: D.string,
  },
  optional: {
    _id: objectIdDecoder,
  },
}).andThen((decodedUnitType) => {
  return {
    id: decodedUnitType._id,
    reference: decodedUnitType.reference,
    unit: decodedUnitType.unit,
  };
});

export const warehouseDecoder = D.object({
  required: {
    reference: D.string,
    description: D.string,
    address: addressDecoder,
  },
  optional: {
    _id: objectIdDecoder,
  },
}).andThen((decodedWarehouse) => {
  return {
    id: decodedWarehouse._id,
    reference: decodedWarehouse.reference,
    description: decodedWarehouse.description,
    address: decodedWarehouse.address,
  };
});
