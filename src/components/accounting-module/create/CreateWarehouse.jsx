/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { addWarehouse, updateWarehouse } from '../../../db/WarehouseHelper';

const CreateWarehouse = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();

  let INITIAL_STATE = {
    reference: '',
    description: '',
    address: {
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
    },
  };

  if (initialState) {
    INITIAL_STATE = {
      reference: initialState.reference,
      description: initialState.description,
      address: {
        roadType: initialState.address.roadType,
        street: initialState.address.street,
        number: initialState.address.number,
        floor: initialState.address.floor,
        door: initialState.address.door,
        extra: initialState.address.extra,
        zipCode: initialState.address.zipCode,
        city: initialState.address.city,
        province: initialState.address.province,
        state: initialState.address.state,
        country: initialState.address.country,
      },
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    description: Yup.string().required(t('form.errors.required')),
    address: Yup.object().shape({
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
    }),
  });

  const handleSubmit = (data) => {
    if (!initialState) {
      addWarehouse(
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
      updateWarehouse(
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
                <Grid item xs={6}>
                  <TextField
                    name="reference"
                    label={t(
                      'accounting_module.warehouse.list.headers.reference'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="description"
                    label={t(
                      'accounting_module.warehouse.list.headers.description'
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>Address</Typography>
                </Grid>

                <Grid item xs={3}>
                  <TextField name="address.roadType" label="Road type" />
                </Grid>

                <Grid item xs={9}>
                  <TextField name="address.street" label="Street" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="address.number" label="Number" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="address.floor" label="Floor" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="address.door" label="Door" />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="address.extra" label="Extra" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="address.zipCode" label="Zip code" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="address.city" label="City" />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="address.province" label="province" />
                </Grid>

                <Grid item xs={6}>
                  <TextField name="address.state" label="State" />
                </Grid>

                <Grid item xs={6}>
                  <TextField name="address.country" label="Country" />
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
