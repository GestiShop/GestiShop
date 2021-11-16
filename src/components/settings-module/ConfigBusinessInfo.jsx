import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import LocalConfiguration from '../../utils/localConfiguration';
import { setDefaultBusinessInfo } from '../../utils/redux/configuration';
import Textfield from '../ui/forms/TextField';
import SubmitButton from '../ui/forms/SubmitButton';
import { AddressSchemaValidator, EmptyAddress } from '../../utils/constants';
import AddressForm from '../ui/AddressForm';

const ConfigBusinessInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = useSelector(
    (store) => store.configuration.businessInfo
  );

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required(t('form.errors.required')),
    nif: Yup.string().required(t('form.errors.required')),
    address: Yup.object().shape(AddressSchemaValidator),
  });

  const INITIAL_STATE = {
    name: initialValues && initialValues.name ? initialValues.name : '',
    nif: initialValues && initialValues.nif ? initialValues.nif : '',
    address:
      initialValues && initialValues.address
        ? initialValues.address
        : EmptyAddress,
  };

  const handleSubmit = (data) => {
    LocalConfiguration.setLocalBusinessInfo(data);
    dispatch(setDefaultBusinessInfo(data));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Textfield
                    name="name"
                    label={t('settings.business_config.name')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Textfield
                    name="nif"
                    label={t('settings.business_config.nif')}
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

export default ConfigBusinessInfo;
