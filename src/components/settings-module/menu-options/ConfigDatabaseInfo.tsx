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
import { PlatformDatabaseInfo } from '../../../model';
import { Checkbox, TextField } from '../../ui/forms';
import LocalConfiguration from '../../../utils/local-configuration';

export const ConfigDatabaseInfo = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const savedDatabaseInfo = useAppSelector(
    (store) => store.configuration.databaseInfo
  );

  const [state, setState] = useState<PlatformDatabaseInfo>(savedDatabaseInfo);

  const handleChange = (name: string, value: string | boolean) => {
    const newState = {
      ...state,
      [name]: value,
    };

    setState(newState);
    LocalConfiguration.setLocalDatabaseInfo(newState);
    dispatch(setStoredDatabaseInfo(newState));
  };

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
                    onInput={handleChange}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    name="port"
                    label={t('settings.database_config.port')}
                    required
                    type="number"
                    onInput={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label={t('settings.database_config.name')}
                    required
                    onInput={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="user"
                    label={t('settings.database_config.user')}
                    required
                    onInput={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label={t('settings.database_config.password')}
                    required
                    type="password"
                    onInput={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Checkbox
                    name="isRemote"
                    label={t('settings.database_config.is_remote_label')}
                    legend={t('settings.database_config.is_remote_legend')}
                    onInput={handleChange}
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
