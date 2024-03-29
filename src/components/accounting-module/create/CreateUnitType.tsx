import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Alert, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { TextField, SubmitButton } from '../../ui/forms';
import { fetchUnitTypeById, upsertUnitType } from '../../../db';
import { UnitType, EMPTY_UNIT_TYPE } from '../../../model';

type Props = {
  closeCallback?: any;
  initialState?: Types.ObjectId;
};

const CreateUnitType = ({
  closeCallback,
  initialState,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const [existingUnitType, setexistingUnitType] =
    useState<UnitType>(EMPTY_UNIT_TYPE);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    unit: Yup.string().required(t('form.errors.required')),
  });

  const handleSubmit = async (data: UnitType): Promise<void> => {
    const response = await upsertUnitType({ ...data, id: initialState });

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      closeCallback();
    }
  };

  const fetchData = async (id: Types.ObjectId): Promise<void> => {
    const response = await fetchUnitTypeById(id);
    if (response.error !== null) {
      console.error(response.error);
    } else {
      if (response.result !== null) {
        setexistingUnitType(response.result);
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
            initialValues={existingUnitType}
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
                    label={t('accounting_module.unit_type.structure.reference')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    name="unit"
                    label={t('accounting_module.unit_type.structure.unit')}
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

CreateUnitType.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateUnitType;
