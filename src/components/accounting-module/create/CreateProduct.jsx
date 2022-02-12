/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import Select from '../../ui/forms/Select';
import MultiSelect from '../../ui/forms/MultiSelect';
import Switch from '../../ui/forms/Switch';
import { addProduct, updateProduct } from '../../../db/ProductHelper';
import {
  fetchTaxes,
  fetchUnitTypes,
  fetchWarehouses,
  fetchCategories,
} from '../../../db';
import useIsMounted from '../../../utils/useIsMounted';

const CreateProduct = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const [stockAlert, setStockAlert] = useState(
    initialState ? initialState.stockAlert : false
  );
  const [taxesOptions, setTaxesOptions] = useState([]);
  const [unitTypesOptions, setUnitTypesOptions] = useState([]);
  const [warehousesOptions, setWarehousesOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const isMounted = useIsMounted();
  const [buyingInfo, setBuyingInfo] = useState(
    initialState
      ? {
          basePrice: initialState.buyingInfo.basePrice,
          discountPercentage: initialState.buyingInfo.discountPercentage,
          taxPercentage: initialState.buyingInfo.taxPercentage.percentage,
        }
      : {
          basePrice: 0,
          discountPercentage: 0,
          taxPercentage: 0,
        }
  );
  const [sellingInfo, setSellingInfo] = useState(
    initialState
      ? {
          basePrice: initialState.sellingInfo.basePrice,
          discountPercentage: initialState.sellingInfo.discountPercentage,
          taxPercentage: initialState.sellingInfo.taxPercentage.percentage,
        }
      : {
          basePrice: 0,
          discountPercentage: 0,
          taxPercentage: 0,
        }
  );
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );

  let INITIAL_STATE = {
    reference: '',
    name: '',
    description: '',
    buyingInfo: {
      basePrice: 0.0,
      discountPercentage: 0.0,
      taxPercentage: '',
      pvp: 0.0,
    },
    sellingInfo: {
      basePrice: 0.0,
      discountPercentage: 0.0,
      taxPercentage: '',
      pvp: 0.0,
    },
    stock: 0.0,
    unitType: '',
    warehouse: '',
    categories: [],
    stockAlert: false,
    minStock: 0.0,
  };

  if (initialState) {
    INITIAL_STATE = {
      reference: initialState.reference,
      name: initialState.name,
      description: initialState.description,
      buyingInfo: {
        basePrice: initialState.buyingInfo.basePrice,
        discountPercentage: initialState.buyingInfo.discountPercentage,
        taxPercentage: initialState.buyingInfo.taxPercentage.id,
        pvp:
          initialState.buyingInfo.basePrice *
          (1 - initialState.buyingInfo.discountPercentage / 100) *
          (1 + initialState.buyingInfo.taxPercentage.percentage / 100),
      },
      sellingInfo: {
        basePrice: initialState.sellingInfo.basePrice,
        discountPercentage: initialState.sellingInfo.discountPercentage,
        taxPercentage: initialState.sellingInfo.taxPercentage.id,
        pvp:
          initialState.sellingInfo.basePrice *
          (1 - initialState.sellingInfo.discountPercentage / 100) *
          (1 + initialState.sellingInfo.taxPercentage.percentage / 100),
      },
      stock: initialState.stock,
      unitType: initialState.unitType.id,
      warehouse: initialState.warehouse.id,
      categories: Array.from(initialState.categories.map((x) => x.id)),
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
      pvp: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
    }),
    sellingInfo: Yup.object().shape({
      basePrice: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      discountPercentage: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
      taxPercentage: Yup.string().required(t('form.errors.required')),
      pvp: Yup.number()
        .typeError(t('form.errors.invalid_number'))
        .required(t('form.errors.required')),
    }),
    stock: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    unitType: Yup.string().required(t('form.errors.required')),
    warehouse: Yup.string().required(t('form.errors.required')),
    categories: Yup.array(),
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
            enableReinitialize
            initialValues={{
              ...INITIAL_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              delete values.sellingInfo.pvp;
              delete values.buyingInfo.pvp;
              handleSubmit(values);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.product.creation.basic_information')}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    name="reference"
                    label={t('accounting_module.product.structure.reference')}
                  />
                </Grid>

                <Grid item xs={9}>
                  <TextField
                    required
                    name="name"
                    label={t('accounting_module.product.structure.name')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={5}
                    name="description"
                    label={t('accounting_module.product.structure.description')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Select
                    required
                    name="unitType"
                    label={t('accounting_module.product.structure.unit_type')}
                    options={unitTypesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.unit}`,
                        value: x.id,
                      };
                    })}
                    acceptNone
                  />
                </Grid>

                <Grid item xs={6}>
                  <Select
                    required
                    name="warehouse"
                    label={t('accounting_module.product.structure.warehouse')}
                    options={warehousesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.description}`,
                        value: x.id,
                      };
                    })}
                    acceptNone
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultiSelect
                    name="categories"
                    label={t('accounting_module.product.structure.categories')}
                    initialValue={INITIAL_STATE.categories}
                    options={categoriesOptions.map((x) => {
                      return {
                        displayText: `[${x.reference}] ${x.name}`,
                        value: x.id,
                      };
                    })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.product.creation.stock_information')}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    name="stock"
                    label={t('accounting_module.product.structure.stock')}
                    type="number"
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    disabled={!stockAlert}
                    name="minStock"
                    label={t('accounting_module.product.structure.min_stock')}
                    type="number"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Switch
                    name="stockAlert"
                    label={t('accounting_module.product.structure.stock_alert')}
                    initialState={INITIAL_STATE.stockAlert}
                    setValue={setStockAlert}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t('accounting_module.product.creation.buying_information')}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    name="buyingInfo.basePrice"
                    label={t('accounting_module.product.structure.base_price', {
                      currency,
                    })}
                    type="number"
                    onInput={(event) =>
                      setBuyingInfo({
                        ...buyingInfo,
                        basePrice: parseFloat(event.target.value),
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    name="buyingInfo.discountPercentage"
                    label={t(
                      'accounting_module.product.structure.discount_percentage'
                    )}
                    type="number"
                    onInput={(event) =>
                      setBuyingInfo({
                        ...buyingInfo,
                        discountPercentage: parseFloat(event.target.value),
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Select
                    required
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
                    onInput={(event) =>
                      setBuyingInfo({
                        ...buyingInfo,
                        taxPercentage: taxesOptions.filter(
                          (x) => x.id === event.target.value
                        )[0].percentage,
                      })
                    }
                    acceptNone
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    value={parseFloat(
                      buyingInfo.basePrice *
                        (1 - buyingInfo.discountPercentage / 100) *
                        (1 + buyingInfo.taxPercentage / 100)
                    ).toFixed(numberOfDecimals)}
                    disabled
                    name="buyingInfo.pvp"
                    label={t('accounting_module.product.structure.pvp', {
                      currency,
                    })}
                    type="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {t(
                      'accounting_module.product.creation.selling_information'
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    name="sellingInfo.basePrice"
                    label={t('accounting_module.product.structure.base_price', {
                      currency,
                    })}
                    type="number"
                    onInput={(event) =>
                      setSellingInfo({
                        ...sellingInfo,
                        basePrice: parseFloat(event.target.value),
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    required
                    name="sellingInfo.discountPercentage"
                    label={t(
                      'accounting_module.product.structure.discount_percentage'
                    )}
                    type="number"
                    onInput={(event) =>
                      setSellingInfo({
                        ...sellingInfo,
                        discountPercentage: parseFloat(event.target.value),
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Select
                    required
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
                    onInput={(event) =>
                      setSellingInfo({
                        ...sellingInfo,
                        taxPercentage: taxesOptions.filter(
                          (x) => x.id === event.target.value
                        )[0].percentage,
                      })
                    }
                    acceptNone
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    disabled
                    value={parseFloat(
                      sellingInfo.basePrice *
                        (1 - sellingInfo.discountPercentage / 100) *
                        (1 + sellingInfo.taxPercentage / 100)
                    ).toFixed(numberOfDecimals)}
                    name="sellingInfo.pvp"
                    label={t('accounting_module.product.structure.pvp', {
                      currency,
                    })}
                    type="number"
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
