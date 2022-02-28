import React, { ReactElement } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextField, SubmitButton } from '../../ui/forms';
import { upsertWarehouse } from '../../../db';
import { AddressSchemaValidator } from '../../../utils/form-validations';
import AddressForm from '../../ui/AddressForm';
import { Warehouse, EMPTY_WAREHOUSE } from '../../../model';

type Props = {
  closeCallback?: any;
  initialState?: Warehouse;
};

const CreateWarehouse = ({
  closeCallback,
  initialState,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const INITIAL_STATE: Warehouse = initialState ?? EMPTY_WAREHOUSE;

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    description: Yup.string().required(t('form.errors.required')),
    address: Yup.object().shape(AddressSchemaValidator(t)),
  });

  const handleSubmit = async (data: Warehouse): Promise<void> => {
    await upsertWarehouse({ ...data, id: initialState?.id });
    closeCallback();
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
                    required
                    name="reference"
                    label={t('accounting_module.warehouse.structure.reference')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    name="description"
                    label={t(
                      'accounting_module.warehouse.structure.description'
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.warehouse.structure.address')}
                  </Typography>
                </Grid>

                <AddressForm parent="address" />

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

CreateWarehouse.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateWarehouse;
