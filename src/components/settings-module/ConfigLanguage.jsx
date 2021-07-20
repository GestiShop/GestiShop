import React from 'react';
import * as Yup from 'yup';
import { Container, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LocalConfiguration from '../../utils/localConfiguration';
import Select from '../ui/forms/Select';
import { LANGUAGE_LIST } from '../../../assets/config/config';
import { setDefaultLang } from '../../redux/configuration';

const ConfigLanguage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const initialValue = useSelector((store) => store.configuration.lang);

  const INITIAL_STATE = initialValue
    ? {
        lang: initialValue.value,
      }
    : {
        lang: LANGUAGE_LIST[0].value,
      };

  const FORM_VALIDATION = Yup.object().shape({
    lang: Yup.string().required(t('form.errors.required')),
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    name="lang"
                    label={t('settings.language_config.language')}
                    options={LANGUAGE_LIST.map((x) => {
                      return {
                        displayText: x.label,
                        value: x.value,
                      };
                    })}
                    onInput={(event) => {
                      const newLang = LANGUAGE_LIST.filter(
                        (x) => x.value === event.target.value
                      )[0];

                      LocalConfiguration.setLocalLang(newLang);
                      i18n.changeLanguage(newLang.value);
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

export default ConfigLanguage;
