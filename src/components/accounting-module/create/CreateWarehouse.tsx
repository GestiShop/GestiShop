import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Alert, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { TextField, SubmitButton } from '../../ui/forms';
import { fetchWarehouseById, upsertWarehouse } from '../../../db';
import { AddressSchemaValidator } from '../../../utils/form-validations';
import AddressForm from '../../ui/AddressForm';
import { Warehouse, EMPTY_WAREHOUSE } from '../../../model';

type Props = {
  closeCallback?: any;
  initialState?: Types.ObjectId;
};

const CreateWarehouse = ({
  closeCallback,
  initialState,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const [existingWarehouse, setExistingWarehouse] =
    useState<Warehouse>(EMPTY_WAREHOUSE);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    description: Yup.string().required(t('form.errors.required')),
    address: Yup.object().shape(AddressSchemaValidator(t)),
  });

  const handleSubmit = async (data: Warehouse): Promise<void> => {
    const response = await upsertWarehouse({ ...data, id: initialState });

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      closeCallback();
    }
  };

  const fetchData = async (id: Types.ObjectId): Promise<void> => {
    const response = await fetchWarehouseById(id);
    if (response.error !== null) {
      console.error(response.error);
    } else {
      if (response.result !== null) {
        setExistingWarehouse(response.result);
      }
    }
  };

  useEffect((): void => {
    if (initialState) {
      fetchData(initialState);
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={existingWarehouse}
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

      {errorMessage !== undefined && (
        <Grid item xs={12}>
          <Alert severity="error" id="error-message--alert">
            {errorMessage}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

CreateWarehouse.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateWarehouse;
