import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import {
  setStoredBusinessInfo,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';
import { TextField } from '../../ui/forms';
import { AddressSchemaValidator } from '../../../utils/form-validations';
import AddressForm from '../../ui/AddressForm';
import { PlatformBusinessInfo } from '../../../model/types';

export const ConfigBusinessInfo = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const savedBusinessInfo = useAppSelector(
    (store) => store.configuration.businessInfo
  );

  const [state, setState] = useState<PlatformBusinessInfo>(savedBusinessInfo);

  const handleChange = (name: string, value: string, isAddress: boolean) => {
    let newState;
    if (isAddress) {
      newState = {
        ...state,
        address: {
          ...state.address,
          [name.split('.').pop()!]: value,
        },
      };
    } else {
      newState = {
        ...state,
        [name]: value,
      };
    }

    setState(newState);
    dispatch(setStoredBusinessInfo(newState));
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required(t('form.errors.required')),
    nif: Yup.string().required(t('form.errors.required')),
    address: Yup.object().shape(AddressSchemaValidator(t)),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...savedBusinessInfo }}
            validationSchema={FORM_VALIDATION}
            onSubmit={() => {}}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label={t('settings.business_config.name')}
                    required
                    onInput={(name, value) => handleChange(name, value, false)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="nif"
                    label={t('settings.business_config.nif')}
                    required
                    onInput={(name, value) => handleChange(name, value, false)}
                  />
                </Grid>

                <AddressForm
                  parent="address"
                  onInput={(name, value) => handleChange(name, value, true)}
                />
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};
