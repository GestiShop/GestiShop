/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
import { fetchCategories } from '../../../db/CategoryHelper';

const CreateProduct = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const [stockAlert, setStockAlert] = useState(false);
  const [taxesOptions, setTaxesOptions] = useState([]);
  const [unitTypesOptions, setUnitTypesOptions] = useState([]);
  const [warehousesOptions, setWarehousesOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const isMounted = useIsMounted();
  const currency = useSelector(
    (store) => store.configuration.currencyInfo.currency.label
  );

  let INITIAL_STATE = {
    reference: '',
    name: '',
    buyingInfo: {
      basePrice: 0.0,
      discountPercentage: 0.0,
      taxPercentage: '',
    },
    sellingInfo: {
      basePrice: 0.0,
      discountPercentage: 0.0,
      taxPercentage: '',
    },
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
      buyingInfo: {
        basePrice: initialState.buyingInfo.basePrice,
        discountPercentage: initialState.buyingInfo.discountPercentage,
        taxPercentage: initialState.buyingInfo.taxPercentage.id,
      },
      sellingInfo: {
        basePrice: initialState.sellingInfo.basePrice,
        discountPercentage: initialState.sellingInfo.discountPercentage,
        taxPercentage: initialState.sellingInfo.taxPercentage.id,
      },
      stock: initialState.stock,
      unitType: initialState.unitType.id,
      warehouse: initialState.warehouse.id,
      categories: Array.from(initialState.categories.map((x) => x.id)),
      visible: initialState.visible,
      stockAlert: initialState.stockAlert,
      minStock: initialState.minStock,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    reference: Yup.string().required(t('form.errors.required')),
    name: Yup.string().required(t('form.errors.required')),
    buyingInfo: Yup.object().shape({
      basePrice: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      discountPercentage: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      taxPercentage: Yup.string().required(t('form.errors.required')),
    }),
    sellingInfo: Yup.object().shape({
      basePrice: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      discountPercentage: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      taxPercentage: Yup.string().required(t('form.errors.required')),
    }),
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
    // TODO: FIX DATA
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
        if (isMounted.current) setTaxesOptions(options);
      }
    );

    fetchUnitTypes(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current) setUnitTypesOptions(options);
      }
    );

    fetchWarehouses(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current) setWarehousesOptions(options);
      }
    );

    fetchCategories(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current) setCategoriesOptions(options);
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
                <Grid item xs={12}>
                  <Typography>Basic information</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="reference"
                    label={t('accounting_module.product.structure.reference')}
                  />
                </Grid>

                <Grid item xs={9}>
                  <TextField
                    name="name"
                    label={t('accounting_module.product.structure.name')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    name="stock"
                    label={t('accounting_module.product.structure.stock')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Select
                    name="unitType"
                    label={t('accounting_module.product.structure.unit_type')}
                    options={unitTypesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.unit}`,
                        value: x.id,
                      };
                    })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Select
                    name="warehouse"
                    label={t('accounting_module.product.structure.warehouse')}
                    options={warehousesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.description}`,
                        value: x.id,
                      };
                    })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultiSelect
                    name="categories"
                    label={t('accounting_module.product.structure.categories')}
                    options={categoriesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.name}`,
                        value: x.id,
                      };
                    })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Switch
                    name="visible"
                    label={t('accounting_module.product.structure.visible')}
                    initialState
                  />
                </Grid>

                <Grid item xs={4}>
                  <Switch
                    name="stockAlert"
                    label={t('accounting_module.product.structure.stock_alert')}
                    initialState={false}
                    setValue={(isChecked) => setStockAlert(isChecked)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    disabled={!stockAlert}
                    name="minStock"
                    label={t('accounting_module.product.structure.min_stock')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>Buying information</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="buyingInfo.basePrice"
                    label={t('accounting_module.product.structure.base_price', {
                      currency,
                    })}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    name="buyingInfo.discountPercentage"
                    label={t(
                      'accounting_module.product.structure.discount_percentage'
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Select
                    name="buyingInfo.taxPercentage"
                    label={t(
                      'accounting_module.product.structure.tax_percentage'
                    )}
                    options={taxesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.percentage}%`,
                        value: x.id,
                      };
                    })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>Selling information</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="sellingInfo.basePrice"
                    label={t('accounting_module.product.structure.base_price', {
                      currency,
                    })}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    name="sellingInfo.discountPercentage"
                    label={t(
                      'accounting_module.product.structure.discount_percentage'
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Select
                    name="sellingInfo.taxPercentage"
                    label={t(
                      'accounting_module.product.structure.tax_percentage'
                    )}
                    options={taxesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.percentage}%`,
                        value: x.id,
                      };
                    })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SubmitButton>
                    {initialState ? t('buttons.save') : t('buttons.create')}
                  </SubmitButton>
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
