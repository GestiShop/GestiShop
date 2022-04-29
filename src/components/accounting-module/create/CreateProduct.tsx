import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  MultiSelect,
  Select,
  SubmitButton,
  Switch,
  TextField,
} from '../../ui/forms';
import { upsertProduct, fetchProductById } from '../../../db';
import { Types } from 'mongoose';
import { EMPTY_PRODUCT, Product } from '../../../model';
import { useAppSelector } from '../../../utils/redux';

type Props = {
  closeCallback?: any;
  initialState?: Types.ObjectId;
};

const CreateProduct = ({
  closeCallback,
  initialState,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const [existingProduct, setExistingProduct] =
    useState<Product>(EMPTY_PRODUCT);

  const [stockAlert, setStockAlert] = useState(
    existingProduct?.stockAlert ?? false
  );
  const [taxesOptions] = useState([]);
  const [unitTypesOptions] = useState([]);
  const [warehousesOptions] = useState([]);
  const [categoriesOptions] = useState([]);

  const currencyCode = useAppSelector(
    (store) => store.configuration.currencyInfo.currencyCode
  );
  const currencyLabel: string = t(
    `settings.currency_config.currency_list.${currencyCode}`
  );

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

  const handleSubmit = async (data: Product): Promise<void> => {
    await upsertProduct({
      ...data,
      id: initialState,
    });
    closeCallback();
  };

  const fetchData = async (id: Types.ObjectId): Promise<void> => {
    const response = await fetchProductById(id);
    if (response.error !== null) {
      console.error(response.error);
    } else {
      if (response.result !== null) {
        setExistingProduct(response.result);
      }
    }
  };

  useEffect((): void => {
    if (initialState) {
      fetchData(initialState);
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={existingProduct}
            enableReinitialize
            validationSchema={FORM_VALIDATION}
            onSubmit={handleSubmit}
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
                    options={unitTypesOptions.map((x) => ({
                      displayText: `[${x.reference}] ${x.unit}`,
                      value: x.id,
                    }))}
                    acceptNone
                  />
                </Grid>

                <Grid item xs={6}>
                  <Select
                    required
                    name="warehouse"
                    label={t('accounting_module.product.structure.warehouse')}
                    options={warehousesOptions.map((x) => ({
                      displayText: `[${x.reference}] ${x.description}`,
                      value: x.id,
                    }))}
                    acceptNone
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultiSelect
                    name="categories"
                    label={t('accounting_module.product.structure.categories')}
                    initialValue={existingProduct.categories ?? []}
                    options={categoriesOptions.map((x) => ({
                      displayText: `[${x.reference}] ${x.name}`,
                      value: x.id,
                    }))}
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
                    initialState={existingProduct.stockAlert}
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
                      currency: currencyLabel,
                    })}
                    type="number"
                    onInput={(event) =>
                      setExistingProduct({
                        ...existingProduct,
                        buyingInfo: {
                          ...existingProduct.buyingInfo,
                          discountPercentage: parseFloat(event),
                        },
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
                      setExistingProduct({
                        ...existingProduct,
                        buyingInfo: {
                          ...existingProduct.buyingInfo,
                          discountPercentage: parseFloat(event),
                        },
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
                    onInput={(event: Types.ObjectId) =>
                      setExistingProduct({
                        ...existingProduct,
                        buyingInfo: {
                          ...existingProduct.buyingInfo,
                          taxPercentage: event,
                        },
                      })
                    }
                    acceptNone
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    value={
                      existingProduct.buyingInfo.basePrice *
                      (1 - existingProduct.buyingInfo.discountPercentage / 100)
                    }
                    disabled
                    name="buyingInfo.pvp"
                    label={t('accounting_module.product.structure.pvp', {
                      currency: currencyLabel,
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
                      currency: currencyLabel,
                    })}
                    type="number"
                    onInput={(event) =>
                      setExistingProduct({
                        ...existingProduct,
                        sellingInfo: {
                          ...existingProduct.sellingInfo,
                          basePrice: parseFloat(event),
                        },
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
                      setExistingProduct({
                        ...existingProduct,
                        sellingInfo: {
                          ...existingProduct.sellingInfo,
                          discountPercentage: event,
                        },
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
                    onInput={(newTaxPercentage: Types.ObjectId) =>
                      setExistingProduct({
                        ...existingProduct,
                        sellingInfo: {
                          ...existingProduct.sellingInfo,
                          taxPercentage: newTaxPercentage,
                        },
                      })
                    }
                    acceptNone
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    disabled
                    value={
                      existingProduct.sellingInfo.basePrice *
                      (1 - existingProduct.sellingInfo.discountPercentage / 100)
                    }
                    name="sellingInfo.pvp"
                    label={t('accounting_module.product.structure.pvp', {
                      currency: currencyLabel,
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
