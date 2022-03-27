import React, { ReactElement, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import LocalConfiguration from '../../../utils/local-configuration';
import { Select } from '../../ui/forms';
import {
  setStoredCurrencyInfo,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';
import {
  CURRENCY_LIST,
  DECIMAL_MODES,
  FLOATING_POSITION_OPTIONS,
  PlatformCurrencyCode,
  PlatformCurrencyInfo,
  PlatformDecimalModeCode,
  PlatformFloatingPositionOption,
} from '../../../model';

export const ConfigCurrencyInfo = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const savedCurrencyInfo: PlatformCurrencyInfo = useAppSelector(
    (store) => store.configuration.currencyInfo
  );

  const [state, setState] = useState<PlatformCurrencyInfo>(savedCurrencyInfo);

  const handleChange = (
    name: string,
    value:
      | PlatformCurrencyCode
      | PlatformDecimalModeCode
      | PlatformFloatingPositionOption
  ) => {
    const newState = {
      ...state,
      [name]: value,
    };

    setState(newState);
    LocalConfiguration.setLocalCurrencyInfo(newState);
    dispatch(setStoredCurrencyInfo(newState));
  };

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
            initialValues={{ ...savedCurrencyInfo }}
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
                    onInput={(currencyCode: PlatformCurrencyCode) =>
                      handleChange('currencyCode', currencyCode)
                    }
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
                    onInput={(decimalModeCode: PlatformDecimalModeCode) =>
                      handleChange('decimalModeCode', decimalModeCode)
                    }
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
                    onInput={(
                      floatingPositions: PlatformFloatingPositionOption
                    ) => handleChange('floatingPositions', floatingPositions)}
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
