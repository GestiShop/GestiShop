import * as Yup from 'yup';

export const EmptyEmail = {
  description: '',
  address: '',
};

export const EmptyPhone = {
  description: '',
  number: '',
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
    state: Yup.string().required(t('form.errors.required')),
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
