/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AddressForm from '../../ui/AddressForm';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { addClient, updateClient } from '../../../db/ClientHelper';
import {
  AddressSchemaValidator,
  EmailSchemaValidator,
  EmptyAddress,
  EmptyEfact,
  EmptyEmail,
  EmptyPhone,
  PhoneSchemaValidator,
} from '../../../utils/constants';

const CreateWarehouse = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();

  let INITIAL_STATE = {
    reference: '',
    contactData: {
      name: '',
      contactPhone: EmptyPhone,
      contactEmail: EmptyEmail,
    },
    fiscalData: {
      name: '',
      nif: '',
      address: EmptyAddress,
    },
    postalData: {
      name: '',
      email: EmptyEmail,
      address: EmptyAddress,
    },
    tributationData: {
      retentionPercentage: 0,
      personalDiscount: 0,
    },
    eFactData: EmptyEfact,
  };

  if (initialState) {
    INITIAL_STATE = {
      reference: initialState.reference,
      contactData: initialState.contactData,
      fiscalData: initialState.fiscalData,
      postalData: initialState.postalData,
      tributationData: initialState.tributationData,
      eFactData: initialState.eFactData,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    contactData: Yup.object().shape({
      name: Yup.string().required(t('form.errors.required')),
      phone: Yup.object().shape(PhoneSchemaValidator(t)),
      email: Yup.object().shape(EmailSchemaValidator(t)),
    }),
    fiscalData: Yup.object().shape({
      name: Yup.string().required(t('form.errors.required')),
      nif: Yup.string().required(t('form.errors.required')),
      address: Yup.object().shape(AddressSchemaValidator(t)),
    }),
    postalData: Yup.object().shape({
      name: Yup.string().required(t('form.errors.required')),
      email: Yup.object().shape(EmailSchemaValidator(t)),
      address: Yup.object().shape(AddressSchemaValidator(t)),
    }),
    tributationData: Yup.object().shape({
      retentionPercentage: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      personalDiscount: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
    }),
    eFactData: Yup.object()
      .notRequired()
      .default(undefined)
      .shape({
        accountingOfficeCode: Yup.string().required(t('form.errors.required')),
        accountingOfficeName: Yup.string().required(t('form.errors.required')),
        managementBodyCode: Yup.string().required(t('form.errors.required')),
        managementBodyName: Yup.string().required(t('form.errors.required')),
        processingUnitCode: Yup.string().required(t('form.errors.required')),
        processingUnitName: Yup.string().required(t('form.errors.required')),
        electronicBillingCode: Yup.string().required(t('form.errors.required')),
      }),
  });

  const handleSubmit = (data) => {
    if (!initialState) {
      addClient(
        data,
        (error) => {
          console.log('error', error);
          closeCallback();
        },
        () => {
          console.log('NO ERROR');
          closeCallback();
        }
      );
    } else {
      updateClient(
        { ...data, _id: initialState._id },
        (error) => {
          console.log('error', error);
          closeCallback();
        },
        () => {
          console.log('NO ERROR');
          closeCallback();
        }
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="reference"
                    label={t('accounting_module.client.structure.reference')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.client.creation.contact_data')}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="contactData.name"
                    label={t('accounting_module.client.structure.name')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="contactData.phone.phone"
                    label={t(
                      'accounting_module.client.structure.main_phone_phone'
                    )}
                  />
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    name="contactData.phone.description"
                    label={t(
                      'accounting_module.client.structure.main_phone_description'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="contactData.email.email"
                    label={t(
                      'accounting_module.client.structure.main_email_email'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="contactData.email.description"
                    label={t(
                      'accounting_module.client.structure.main_email_description'
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.client.creation.fiscal_data')}
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    name="fiscalData.name"
                    label={t('accounting_module.client.structure.name')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="fiscalData.nif"
                    label={t('accounting_module.client.structure.nif')}
                  />
                </Grid>

                <AddressForm parent="fiscalData.address" />

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.client.creation.postal_data')}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="postalData.name"
                    label={t('accounting_module.client.structure.name')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="email"
                    name="postalData.email.email"
                    label={t('accounting_module.client.structure.email')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="postalData.email.description"
                    label={t(
                      'accounting_module.client.structure.email_description'
                    )}
                  />
                </Grid>

                <AddressForm parent="postalData.address" />

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.client.creation.tributation_data')}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    name="tributationData.retentionPercentage"
                    label={t(
                      'accounting_module.client.structure.retention_percentage'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    type="number"
                    name="tributationData.personalDiscount"
                    label={t(
                      'accounting_module.client.structure.personal_discount'
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.client.creation.efact_data')}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="eFactData.accountingOfficeCode"
                    label={t(
                      'accounting_module.client.structure.accounting_office_code'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="eFactData.accountingOfficeName"
                    label={t(
                      'accounting_module.client.structure.accounting_office_name'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="eFactData.managementBodyCode"
                    label={t(
                      'accounting_module.client.structure.management_body_code'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="eFactData.managementBodyName"
                    label={t(
                      'accounting_module.client.structure.management_body_name'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="eFactData.processingUnitCode"
                    label={t(
                      'accounting_module.client.structure.processing_unit_code'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="eFactData.processingUnitName"
                    label={t(
                      'accounting_module.client.structure.processing_unit_name'
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="eFactData.electronicBillingCode"
                    label={t(
                      'accounting_module.client.structure.electronic_billing_code'
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton>
                    {initialState ? t('buttons.save') : t('buttons.create')}
                  </SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateWarehouse;
