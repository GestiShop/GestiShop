import React from 'react';
import * as Yup from 'yup';
import { Container, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import LocalConfiguration from '../../../utils/localConfiguration';
import Select from '../../ui/forms/Select';
import {
  LANGUAGE_LIST,
  PlatformLanguageCode,
} from '../../../../assets/config/config';
import {
  setDefaultLang,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';

export const ConfigLanguage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const INITIAL_STATE: { langCode: PlatformLanguageCode } = {
    langCode: useAppSelector((store) => store.configuration.langCode),
  };

  const FORM_VALIDATION = Yup.object().shape({
    langCode: Yup.string().required(t('form.errors.required')),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={() => {}}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    name="langCode"
                    label={t('settings.language_config.language')}
                    options={LANGUAGE_LIST.map((x) => {
                      return {
                        displayText: t(
                          `settings.language_config.language_list.${x}`
                        ),
                        value: x,
                      };
                    })}
                    onInput={(newLang: PlatformLanguageCode) => {
                      LocalConfiguration.setLocalLang(newLang);
                      i18n.changeLanguage(newLang);
                      dispatch(setDefaultLang(newLang));
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
