/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { addUnitType } from '../../../db/UnitTypeHelper';

const CreateUnitType = ({ closeCallback }) => {
  const { t } = useTranslation();

  const INITIAL_STATE = {
    reference: '',
    unit: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    unit: Yup.string().required(t('form.errors.required')),
  });

  const handleSubmit = (data) => {
    addUnitType(
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
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{
              ...INITIAL_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="reference"
                    label={t(
                      'accounting_module.unit_type.list.headers.reference'
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="unit"
                    label={t('accounting_module.unit_type.list.headers.unit')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton>{t('buttons.create')}</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateUnitType;
