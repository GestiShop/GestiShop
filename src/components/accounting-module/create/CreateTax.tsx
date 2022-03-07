import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { TextField, SubmitButton } from '../../ui/forms';
import { fetchTaxById, upsertTax } from '../../../db';
import { Tax, EMPTY_TAX } from '../../../model';
import useIsMounted from '../../../utils/useIsMounted';

type Props = {
  closeCallback?: any;
  initialState?: Types.ObjectId;
};

const CreateTax = ({ closeCallback, initialState }: Props): ReactElement => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const [existingTax, setExistingTax] = useState<Tax>(EMPTY_TAX);

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    percentage: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
  });

  const handleSubmit = async (data: Tax): Promise<void> => {
    await upsertTax({ ...data, id: initialState });
    closeCallback();
  };

  const fetchData = async (id: Types.ObjectId): Promise<void> => {
    const response = await fetchTaxById(id);
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setExistingTax(response.result);
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
            initialValues={existingTax}
            enableReinitialize
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
