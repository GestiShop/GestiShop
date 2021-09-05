import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import LocalConfiguration from '../../utils/localConfiguration';
import Select from '../ui/forms/Select';
import {
  setDefaultCurrency,
  setDefaultDecimalMode,
  setDefaultFloatingPositions,
} from '../../redux/configuration';
import {
  CURRENCY_LIST,
  DECIMAL_MODES,
  FLOATING_POINT_OPTIONS,
} from '../../../assets/config/config';

const ConfigCurrencyInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = useSelector(
    (store) => store.configuration.currencyInfo
  );

  const FORM_VALIDATION = Yup.object().shape({
    currency: Yup.string().required(t('form.errors.required')),
    decimalMode: Yup.string().required(t('form.errors.required')),
    floatingPositions: Yup.string().required(t('form.errors.required')),
  });

  const INITIAL_STATE = {
    currency:
      initialValues && initialValues.currency && initialValues.currency.value
        ? initialValues.currency.value
        : CURRENCY_LIST[0],
    decimalMode:
      initialValues && initialValues.decimalMode
        ? initialValues.decimalMode
        : DECIMAL_MODES[0],
    floatingPositions:
      initialValues && initialValues.floatingPositions != null
        ? initialValues.floatingPositions
        : FLOATING_POINT_OPTIONS[0],
  };

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
                    name="currency"
                    label={t('settings.currency_config.currency')}
                    options={CURRENCY_LIST.map((x) => {
                      return {
                        displayText: `${x.value} [${x.label}]`,
                        value: x.value,
                      };
                    })}
                    onInput={(event) => {
                      LocalConfiguration.setLocalCurrency(
                        CURRENCY_LIST.filter(
                          (x) => x.value === event.target.value
                        )[0]
                      );
                      dispatch(setDefaultCurrency(event.target.value));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    name="decimalMode"
                    label={t('settings.currency_config.decimal_mode')}
                    options={DECIMAL_MODES.map((x) => {
                      return {
                        displayText: `${x}`,
                        value: x,
                      };
                    })}
                    onInput={(event) => {
                      LocalConfiguration.setLocalDecimalMode(
                        event.target.value
                      );
                      dispatch(setDefaultDecimalMode(event.target.value));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    name="floatingPositions"
                    label={t('settings.currency_config.floating_positions')}
                    options={FLOATING_POINT_OPTIONS.map((x) => {
                      return {
                        displayText: `${x}`,
                        value: x,
                      };
                    })}
                    onInput={(event) => {
                      LocalConfiguration.setLocalFloatingPositions(
                        event.target.value
                      );
                      dispatch(setDefaultFloatingPositions(event.target.value));
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

export default ConfigCurrencyInfo;
