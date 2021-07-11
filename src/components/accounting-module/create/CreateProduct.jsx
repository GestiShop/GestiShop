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
import { fetchCategories } from '../../../db/CategoryHelper';

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

    fetchCategories(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current)
          setCategoriesOptions(options.map((x) => x.reference));
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

                <Grid item xs={6}>
                  <TextField
                    name="basePrice"
                    label={t('accounting_module.product.structure.base_price')}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    name="discountPercentage"
                    label={t(
                      'accounting_module.product.structure.discount_percentage'
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Select
                    name="taxPercentage"
                    label={t(
                      'accounting_module.product.structure.tax_percentage'
                    )}
                    options={taxesOptions}
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
                    options={unitTypesOptions}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Select
                    name="warehouse"
                    label={t('accounting_module.product.structure.warehouse')}
                    options={warehousesOptions}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultiSelect
                    name="categories"
                    label={t('accounting_module.product.structure.categories')}
                    options={categoriesOptions}
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
