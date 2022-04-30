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
import {
  fetchCategories,
  fetchProductById,
  fetchTaxes,
  fetchUnitTypes,
  fetchWarehouses,
  upsertProduct,
} from '../../../db';
import { Types } from 'mongoose';
import {
  Category,
  EMPTY_PRODUCT,
  Product,
  Tax,
  UnitType,
  Warehouse,
} from '../../../model';
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
  const [taxesOptions, setTaxesOptions] = useState<Array<Tax>>([]);
  const [unitTypesOptions, setUnitTypesOptions] = useState<Array<UnitType>>([]);
  const [warehousesOptions, setWarehousesOptions] = useState<Array<Warehouse>>(
    []
  );
  const [categoriesOptions, setCategoriesOptions] = useState<Array<Category>>(
    []
  );

  const [buyingInfo, setBuyingInfo] = useState<{
    basePrice: number;
    taxPercentage: number;
    discountPercentage: number;
  }>({
    basePrice: 0,
    taxPercentage: 0,
    discountPercentage: 0,
  });
  const [sellingInfo, setSellingInfo] = useState<{
    basePrice: number;
    taxPercentage: number;
    discountPercentage: number;
  }>({
    basePrice: 0,
    taxPercentage: 0,
    discountPercentage: 0,
  });

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
    stockAlert: Yup.bool().required().default(false),
    minStock: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required()
      .default(0),
  });

  const handleSubmit = async (data: Product): Promise<void> => {
    const response = await upsertProduct({
      ...data,
      id: initialState,
    });

    if (response.error === null) {
      closeCallback();
    } else {
      console.error(response.error.code, response.error.message);
    }
  };

  const fetchData = async (id?: Types.ObjectId): Promise<void> => {
    const fetchTaxesResponse = await fetchTaxes();
    if (fetchTaxesResponse.error !== null) {
      console.error(fetchTaxesResponse.error);
    } else {
      if (fetchTaxesResponse.result !== null) {
        setTaxesOptions(fetchTaxesResponse.result);
      }
    }

    const fetchUnitTypesResponse = await fetchUnitTypes();
    if (fetchUnitTypesResponse.error !== null) {
      console.error(fetchUnitTypesResponse.error);
    } else {
      if (fetchUnitTypesResponse.result !== null) {
        setUnitTypesOptions(fetchUnitTypesResponse.result);
      }
    }

    const fetchWarehousesResponse = await fetchWarehouses();
    if (fetchWarehousesResponse.error !== null) {
      console.error(fetchWarehousesResponse.error);
    } else {
      if (fetchWarehousesResponse.result !== null) {
        setWarehousesOptions(fetchWarehousesResponse.result);
      }
    }

    const fetchCategoriesResponse = await fetchCategories();
    if (fetchCategoriesResponse.error !== null) {
      console.error(fetchCategoriesResponse.error);
    } else {
      if (fetchCategoriesResponse.result !== null) {
        setCategoriesOptions(fetchCategoriesResponse.result);
      }
    }

    if (id !== undefined) {
      const fetchProductByIdResponse = await fetchProductById(id);
      if (fetchProductByIdResponse.error !== null) {
        console.error(fetchProductByIdResponse.error);
      } else {
        if (fetchProductByIdResponse.result !== null) {
          setExistingProduct(fetchProductByIdResponse.result);
          setBuyingInfo({
            basePrice: fetchProductByIdResponse.result.buyingInfo.basePrice,
            discountPercentage:
              fetchProductByIdResponse.result.buyingInfo.discountPercentage,
            taxPercentage:
              taxesOptions.find(
                (tax) =>
                  tax.id ===
                  fetchProductByIdResponse.result?.buyingInfo.taxPercentage
              )?.percentage ?? 0,
          });
          setSellingInfo({
            basePrice: fetchProductByIdResponse.result.sellingInfo.basePrice,
            discountPercentage:
              fetchProductByIdResponse.result.sellingInfo.discountPercentage,
            taxPercentage:
              taxesOptions.find(
                (tax) =>
                  tax.id ===
                  fetchProductByIdResponse.result?.sellingInfo.taxPercentage
              )?.percentage ?? 0,
          });
        }
      }
    }
  };

  useEffect((): void => {
    fetchData(initialState);
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
                    onInput={(_, eventValue) =>
                      setBuyingInfo({
                        ...buyingInfo,
                        basePrice: eventValue,
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
                    onInput={(_, eventValue) =>
                      setBuyingInfo({
                        ...buyingInfo,
                        discountPercentage: eventValue,
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
                    onInput={(newBuyingTaxId: Types.ObjectId) =>
                      setBuyingInfo({
                        ...buyingInfo,
                        taxPercentage:
                          taxesOptions.find((tax) => tax.id === newBuyingTaxId)
                            ?.percentage ?? 0,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    value={
                      buyingInfo.basePrice *
                      (1 + buyingInfo.taxPercentage / 100) *
                      (1 - buyingInfo.discountPercentage / 100)
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
                    onInput={(_, eventValue) =>
                      setSellingInfo({
                        ...sellingInfo,
                        basePrice: eventValue,
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
                    onInput={(_, eventValue) =>
                      setSellingInfo({
                        ...sellingInfo,
                        discountPercentage: eventValue,
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
                    onInput={(newSellingTaxId: Types.ObjectId) =>
                      setSellingInfo({
                        ...sellingInfo,
                        taxPercentage:
                          taxesOptions.find((tax) => tax.id === newSellingTaxId)
                            ?.percentage ?? 0,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    disabled
                    value={
                      sellingInfo.basePrice *
                      (1 + sellingInfo.taxPercentage / 100) *
                      (1 - sellingInfo.discountPercentage / 100)
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
