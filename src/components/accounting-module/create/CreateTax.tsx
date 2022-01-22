/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { upsertTax } from '../../../db';
import { Tax } from '../../../model/types';
import { EMPTY_TAX } from '../../../model/samples';

type Props = {
  closeCallback?: any;
  initialState?: Tax;
};

const CreateTax = ({ closeCallback, initialState }: Props): JSX.Element => {
  const { t } = useTranslation();

  const INITIAL_STATE: Tax = initialState ?? EMPTY_TAX;

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    percentage: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
  });

  const handleSubmit = async (data: Tax) => {
    await upsertTax({ ...data, id: initialState?.id });
    closeCallback();
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
                    required
                    name="reference"
                    label={t('accounting_module.tax.structure.reference')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    name="percentage"
                    label={t('accounting_module.tax.structure.percentage')}
                    type="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton>
                    {initialState !== undefined
                      ? t('buttons.save')
                      : t('buttons.create')}
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

CreateTax.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateTax;
