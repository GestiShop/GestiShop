import React, { useState } from 'react';
import * as Yup from 'yup';
import { Container, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import LocalConfiguration from '../../../utils/localConfiguration';
import { Select } from '../../ui/forms';
import {
  LANGUAGE_LIST,
  PlatformLanguageCode,
  PlatformLanguageInfo,
} from '../../../model/types';
import {
  setStoredLanguageInfo,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';

export const ConfigLanguageInfo = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const savedLanguageInfo: PlatformLanguageInfo = useAppSelector(
    (store) => store.configuration.languageInfo
  );

  const [state, setState] = useState<PlatformLanguageInfo>(savedLanguageInfo);

  const FORM_VALIDATION = Yup.object().shape({
    languageCode: Yup.string().required(t('form.errors.required')),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...savedLanguageInfo }}
            validationSchema={FORM_VALIDATION}
            onSubmit={() => {}}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    name="languageCode"
                    label={t('settings.language_config.language')}
                    options={LANGUAGE_LIST.map((x) => {
                      return {
                        displayText: t(
                          `settings.language_config.language_list.${x}`
                        ),
                        value: x,
                      };
                    })}
                    onInput={(languageCode: PlatformLanguageCode) => {
                      const newState: PlatformLanguageInfo = {
                        ...state,
                        languageCode,
                      };
                      i18n.changeLanguage(languageCode);
                      setState(newState);
                      LocalConfiguration.setLocalLang(newState);
                      dispatch(setStoredLanguageInfo(newState));
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
