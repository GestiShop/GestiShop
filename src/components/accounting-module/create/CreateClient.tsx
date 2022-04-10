import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import AddressForm from '../../ui/AddressForm';
import { SubmitButton, TextField } from '../../ui/forms';
import {
  AddressSchemaValidator,
  EFactDataSchemeValidator,
  EmailSchemaValidator,
  PhoneSchemaValidator,
} from '../../../utils/form-validations';
import { Client, EMPTY_CLIENT } from '../../../model';
import { upsertClient, fetchClientById } from '../../../db';

type Props = {
  closeCallback?: any;
  initialState?: Types.ObjectId;
};

const CreateClient = ({ closeCallback, initialState }: Props): ReactElement => {
  const { t } = useTranslation();
  const [existingClient, setExistingClient] = useState<Client>(EMPTY_CLIENT);

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
    eFactData: EFactDataSchemeValidator(),
  });

  const handleSubmit = async (data: Client): Promise<void> => {
    await upsertClient({
      ...data,
      id: initialState,
    });
    closeCallback();
  };

  const fetchData = async (id: Types.ObjectId): Promise<void> => {
    const response = await fetchClientById(id);
    if (response.error !== null) {
      console.log(response.error);
    } else {
      if (response.result !== null) {
        setExistingClient(response.result);
      }
    }
  };

  useEffect((): void => {
    if (initialState) {
      fetchData(initialState);
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={existingClient}
            enableReinitialize
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="reference"
                    label={`${t(
                      'accounting_module.client.structure.reference'
                    )} *`}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.client.creation.contact_data')}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    name="contactData.name"
                    label={t('accounting_module.client.structure.name')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
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
                    required
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
                    required
                    name="fiscalData.name"
                    label={t('accounting_module.client.structure.name')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
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
                    required
                    name="postalData.name"
                    label={t('accounting_module.client.structure.name')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
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
                    disabled
                    required
                    type="number"
                    name="tributationData.retentionPercentage"
                    label={t(
                      'accounting_module.client.structure.retention_percentage'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    disabled
                    required
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

CreateClient.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateClient;
