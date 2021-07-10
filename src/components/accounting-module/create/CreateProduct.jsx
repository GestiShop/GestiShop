/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import Select from '../../ui/forms/Select';
import MultiSelect from '../../ui/forms/MultiSelect';
import Switch from '../../ui/forms/Switch';
import { addProduct, updateProduct } from '../../../db/ProductHelper';
import { fetchTaxes } from '../../../db/TaxHelper';
import useIsMounted from '../../../utils/useIsMounted';
import { fetchUnitTypes } from '../../../db/UnitTypeHelper';
import { fetchWarehouses } from '../../../db/WarehouseHelper';

const CreateProduct = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const [stockAlert, setStockAlert] = useState(false);
  const [taxesOptions, setTaxesOptions] = useState([]);
  const [unitTypesOptions, setUnitTypesOptions] = useState([]);
  const [warehousesOptions, setWarehousesOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  const isMounted = useIsMounted();

  let INITIAL_STATE = {
    reference: '',
    name: '',
    basePrice: 0.0,
    discountPercentage: 0.0,
    taxPercentage: '',
    stock: 0.0,
    unitType: '',
    warehouse: '',
    categories: [],
    visible: true,
    stockAlert: false,
    minStock: 0.0,
  };

  if (initialState) {
    INITIAL_STATE = {
      reference: initialState.reference,
      name: initialState.name,
      basePrice: initialState.basePrice,
      discountPercentage: initialState.discountPercentage,
      taxPercentage: initialState.taxPercentage,
      stock: initialState.stock,
      unitType: initialState.unitType,
      warehouse: initialState.warehouse,
      categories: initialState.categories,
      visible: initialState.visible,
      stockAlert: initialState.stockAlert,
      minStock: initialState.minStock,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    name: Yup.string().required(t('form.errors.required')),
    basePrice: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    discountPercentage: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    taxPercentage: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    stock: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    unitType: Yup.string().required(t('form.errors.required')),
    warehouse: Yup.string().required(t('form.errors.required')),
    categories: Yup.array(),
    visible: Yup.bool(),
    stockAlert: Yup.bool(),
    minStock: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
  });

  const handleSubmit = (data) => {
    if (!initialState) {
      addProduct(
        data,
        (error) => {
          console.log('error', error);
          closeCallback();
        },
        () => {
          console.log('NO ERROR');
          closeCallback();
        }
      );
    } else {
      updateProduct(
        { ...data, _id: initialState._id },
        (error) => {
          console.log('error', error);
          closeCallback();
        },
        () => {
          console.log('NO ERROR');
          closeCallback();
        }
      );
    }
  };

  const fetchData = () => {
    fetchTaxes(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current) setTaxesOptions(options.map((x) => x.reference));
      }
    );

    fetchUnitTypes(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current)
          setUnitTypesOptions(options.map((x) => x.reference));
      }
    );

    fetchWarehouses(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current)
          setWarehousesOptions(options.map((x) => x.reference));
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{
              ...INITIAL_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField name="reference" label="Product Reference" />
                </Grid>

                <Grid item xs={9}>
                  <TextField name="name" label="Product Name" />
                </Grid>

                <Grid item xs={6}>
                  <TextField name="basePrice" label="Product Base Price" />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    name="discountPercentage"
                    label="Product Discount (%)"
                  />
                </Grid>

                <Grid item xs={3}>
                  <Select
                    name="taxPercentage"
                    label="Tax percentage (%)"
                    options={taxesOptions}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField name="stock" label="Product Stock" />
                </Grid>

                <Grid item xs={4}>
                  <Select
                    name="unitType"
                    label="Unit type"
                    options={unitTypesOptions}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Select
                    name="warehouse"
                    label="Warehouse"
                    options={warehousesOptions}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultiSelect
                    name="categories"
                    label="Categories"
                    options={categoriesOptions}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Switch name="visible" label="Visible" initialState />
                </Grid>

                <Grid item xs={4}>
                  <Switch
                    name="stockAlert"
                    label="Stock alert"
                    initialState={false}
                    setValue={(isChecked) => setStockAlert(isChecked)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    disabled={!stockAlert}
                    name="minStock"
                    label="Minimum stock"
                  />
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton>{t('buttons.create')}</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
