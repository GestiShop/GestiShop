import React, { ReactElement } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import { upsertUnitType } from '../../../db';
import { UnitType } from '../../../model/types';
import { EMPTY_UNIT_TYPE } from '../../../model/samples';

type Props = {
  closeCallback?: any;
  initialState?: UnitType;
};

const CreateUnitType = ({
  closeCallback,
  initialState,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const INITIAL_STATE: UnitType = initialState ?? EMPTY_UNIT_TYPE;

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    unit: Yup.string().required(t('form.errors.required')),
  });

  const handleSubmit = async (data: UnitType): Promise<void> => {
    await upsertUnitType({ ...data, id: initialState?.id });
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
    </Grid>
  );
};

CreateUnitType.defaultProps = {
  closeCallback: undefined,
  initialState: undefined,
};

export default CreateUnitType;
