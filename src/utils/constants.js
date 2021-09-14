import * as Yup from 'yup';

export const EmptyEmail = {
  description: '',
  email: '',
};

export const EmptyPhone = {
  description: '',
  phone: '',
};

export const EmptyAddress = {
  roadType: '',
  street: '',
  number: '',
  floor: '',
  door: '',
  extra: '',
  zipCode: '',
  city: '',
  province: '',
  state: '',
  country: '',
};

export const EmptyBillProduct = {
  product: '',
  reference: '',
  name: '',
  basePricePerUnit: 0,
  basePrice: 0,
  unitType: '',
  discountPercentage: 0,
  taxPercentage: 0,
  quantity: 0,
  pvp: 0,
};

export const EmptyBudgetProduct = EmptyBillProduct;

export const EmptyDeliveryNoteProduct = EmptyBillProduct;

export const EmptyEfact = {
  accountingOfficeCode: '',
  accountingOfficeName: '',
  managementBodyCode: '',
  managementBodyName: '',
  processingUnitCode: '',
  processingUnitName: '',
  electronicBillingCode: '',
};

export const AddressSchemaValidator = (t) => {
  return {
    roadType: Yup.string().required(t('form.errors.required')),
    street: Yup.string().required(t('form.errors.required')),
    number: Yup.string().required(t('form.errors.required')),
    floor: Yup.string(),
    door: Yup.string(),
    extra: Yup.string(),
    zipCode: Yup.string().required(t('form.errors.required')),
    city: Yup.string().required(t('form.errors.required')),
    province: Yup.string().required(t('form.errors.required')),
    state: Yup.string(),
    country: Yup.string().required(t('form.errors.required')),
  };
};

export const EmailSchemaValidator = (t) => {
  return {
    description: Yup.string(),
    email: Yup.string()
      .email(t('form.errors.invalid_email'))
      .required(t('form.errors.required')),
  };
};

export const PhoneSchemaValidator = (t) => {
  return {
    description: Yup.string(),
    phone: Yup.string().required(t('form.errors.required')),
  };
};
