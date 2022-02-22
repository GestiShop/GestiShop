import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import LocalConfiguration from '../../../utils/localConfiguration';
import Select from '../../ui/forms/Select';
import {
  setDefaultCurrencyInfo,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';
import {
  CURRENCY_LIST,
  DECIMAL_MODES,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_DECIMAL_MODE_CODE,
  DEFAULT_FLOATING_POSITION_OPTION_CODE,
  FLOATING_POSITION_OPTIONS,
  PlatformCurrencyInfo,
} from '../../../../assets/config/config';

export const ConfigCurrencyInfo = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const initialValues = useAppSelector(
    (store) => store.configuration.currencyInfo
  );

  const INITIAL_STATE = {
    currencyCode: initialValues?.currencyCode ?? DEFAULT_CURRENCY_CODE,
    decimalModeCode:
      initialValues?.decimalModeCode ?? DEFAULT_DECIMAL_MODE_CODE,
    floatingPositions:
      initialValues?.floatingPositions ?? DEFAULT_FLOATING_POSITION_OPTION_CODE,
  };

  const [state, setState] = useState<PlatformCurrencyInfo>(INITIAL_STATE);

  const FORM_VALIDATION = Yup.object().shape({
    currencyCode: Yup.string().required(t('form.errors.required')),
    decimalModeCode: Yup.string().required(t('form.errors.required')),
    floatingPositions: Yup.string().required(t('form.errors.required')),
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
                    name="currencyCode"
                    label={t('settings.currency_config.currency')}
                    options={CURRENCY_LIST.map((currencyCode) => {
                      return {
                        displayText: `${currencyCode} [${t(
                          `settings.currency_config.currency_list.${currencyCode}`
                        )}]`,
                        value: currencyCode,
                      };
                    })}
                    onInput={(currencyCode) => {
                      const newState: PlatformCurrencyInfo = {
                        ...state,
                        currencyCode,
                      };
                      setState(newState);
                      LocalConfiguration.setLocalCurrencyInfo(newState);
                      dispatch(setDefaultCurrencyInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    name="decimalModeCode"
                    label={t('settings.currency_config.decimal_mode')}
                    options={DECIMAL_MODES.map((x) => {
                      return {
                        displayText: `${x}`,
                        value: x,
                      };
                    })}
                    onInput={(decimalModeCode) => {
                      const newState: PlatformCurrencyInfo = {
                        ...state,
                        decimalModeCode,
                      };
                      setState(newState);
                      LocalConfiguration.setLocalCurrencyInfo(newState);
                      dispatch(setDefaultCurrencyInfo(newState));
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    name="floatingPositions"
                    label={t('settings.currency_config.floating_positions')}
                    options={FLOATING_POSITION_OPTIONS.map((x) => {
                      return {
                        displayText: `${x}`,
                        value: x,
                      };
                    })}
                    onInput={(floatingPositions) => {
                      const newState: PlatformCurrencyInfo = {
                        ...state,
                        floatingPositions,
                      };
                      setState(newState);
                      LocalConfiguration.setLocalCurrencyInfo(newState);
                      dispatch(setDefaultCurrencyInfo(newState));
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
