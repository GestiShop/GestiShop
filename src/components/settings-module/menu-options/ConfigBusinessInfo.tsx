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
import { TextField, SubmitButton } from '../../ui/forms';
import { AddressSchemaValidator } from '../../../utils/constants';
import AddressForm from '../../ui/AddressForm';
import { PlatformBusinessInfo } from '../../../../assets/config/config';

export const ConfigBusinessInfo = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const savedBusinessInfo = useAppSelector(
    (store) => store.configuration.businessInfo
  );

  const [state, setState] = useState<PlatformBusinessInfo>(savedBusinessInfo);

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required(t('form.errors.required')),
    nif: Yup.string().required(t('form.errors.required')),
    address: Yup.object().shape(AddressSchemaValidator),
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
                    onInput={(name: string) => {
                      const newState = {
                        ...state,
                        name,
                      };
                      setState(newState);
                      dispatch(setStoredBusinessInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="nif"
                    label={t('settings.business_config.nif')}
                    required
                    onInput={(nif: string) => {
                      const newState = {
                        ...state,
                        nif,
                      };
                      setState(newState);
                      dispatch(setStoredBusinessInfo(newState));
                    }}
                  />
                </Grid>

                <AddressForm parent="address" />

                <Grid item xs={12}>
                  <SubmitButton>{t('buttons.save')}</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};
