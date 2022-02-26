import React, { ReactElement, useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  setStoredDatabaseInfo,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';
import { PlatformDatabaseInfo } from '../../../../assets/config/config';
import { TextField } from '../../ui/forms';

export const ConfigDatabaseInfo = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const savedDatabaseInfo = useAppSelector(
    (store) => store.configuration.databaseInfo
  );

  const [state, setState] = useState<PlatformDatabaseInfo>(savedDatabaseInfo);

  const FORM_VALIDATION = Yup.object().shape({
    url: Yup.string().required(t('form.errors.required')),
    port: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    name: Yup.string().required(t('form.errors.required')),
    user: Yup.string().required(t('form.errors.required')),
    password: Yup.string(),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...savedDatabaseInfo }}
            validationSchema={FORM_VALIDATION}
            onSubmit={() => {}}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <TextField
                    name="url"
                    label={t('settings.database_config.url')}
                    required
                    type="url"
                    onInput={(url) => {
                      const newState = {
                        ...state,
                        url,
                      };
                      setState(newState);
                      dispatch(setStoredDatabaseInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    name="port"
                    label={t('settings.database_config.port')}
                    required
                    type="number"
                    onInput={(port) => {
                      const newState = {
                        ...state,
                        port,
                      };
                      setState(newState);
                      dispatch(setStoredDatabaseInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label={t('settings.database_config.name')}
                    required
                    onInput={(name) => {
                      const newState = {
                        ...state,
                        name,
                      };
                      setState(newState);
                      dispatch(setStoredDatabaseInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="user"
                    label={t('settings.database_config.user')}
                    required
                    onInput={(user) => {
                      const newState = {
                        ...state,
                        user,
                      };
                      setState(newState);
                      dispatch(setStoredDatabaseInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label={t('settings.database_config.password')}
                    required
                    type="password"
                    onInput={(password) => {
                      const newState = {
                        ...state,
                        password,
                      };
                      setState(newState);
                      dispatch(setStoredDatabaseInfo(newState));
                    }}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};
