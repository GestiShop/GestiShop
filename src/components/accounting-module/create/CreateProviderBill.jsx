/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import { Form, Formik, FieldArray } from 'formik';
import { Container, Grid, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Button,
  TextField,
  SubmitButton,
  Switch,
  DateTimePicker,
  AutocompleteSelect,
  Select,
} from '../../ui/forms';
import {
  addProviderBill,
  updateProviderBill,
} from '../../../db/ProviderBillHelper';
import { fetchProviders } from '../../../db/ProviderHelper';
import { fetchProducts } from '../../../db/ProductHelper';
import AddressForm from '../../ui/AddressForm';
import { AddressSchemaValidator } from '../../../utils/form-validations';
import PAYMENT_METHODS from '../../../../assets/payment_methods';
import { EMPTY_ADDRESS, EMPTY_PRODUCT_IN_BILL } from '../../../model';

const CreateProviderBill = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const [providerList, setProviderList] = useState([]);
  const [providerListOptions, setProviderListOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListOptions, setProductListOptions] = useState([]);
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );
  const [billProducts, setBillProducts] = useState([]);
  const [generalDiscount, setGeneralDiscount] = useState(0);

  const encodeProduct = (data, i) => {
    return {
      product: data.product.value,
      reference: data.reference,
      name: data.name,
      basePricePerUnit: billProducts[i].basePricePerUnit,
      unitType: data.unitType,
      discountPercentage: billProducts[i].discountPercentage,
      taxPercentage: billProducts[i].taxPercentage,
      quantity: billProducts[i].quantity,
    };
  };

  const encodeProviderBill = (data) => {
    return {
      billNumberPreamble: data.billNumberPreamble,
      billNumber: data.billNumber,
      date: data.date,
      entityData: {
        entity: data.entityData.entity.value,
        fiscalData: data.entityData.fiscalData,
      },
      products: data.products.map(encodeProduct),
      notes: data.notes,
      basePrice:
        billProducts
          .map(
            (product) =>
              product.basePricePerUnit *
              product.quantity *
              (1 - product.discountPercentage / 100)
          )
          .reduce((acc, product) => acc + product, 0) *
        (1 - generalDiscount / 100),
      generalDiscount: data.generalDiscount,
      pvp:
        billProducts
          .map(
            (product) =>
              product.basePricePerUnit *
              product.quantity *
              (1 - product.discountPercentage / 100) *
              (1 + product.taxPercentage / 100)
          )
          .reduce((acc, product) => acc + product, 0) *
        (1 - generalDiscount / 100),
      paymentData: data.paymentData,
      isPaid: data.isPaid,
    };
  };

  const fetchData = () => {
    fetchProviders(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        setProviderList(options);
        setProviderListOptions(
          options.map((provider) => {
            return {
              value: provider.id,
              displayText: `${provider.fiscalData.name} [${provider.reference}]`,
            };
          })
        );
      }
    );

    fetchProducts(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        setProductList(options);
        setProductListOptions(
          options.map((product) => {
            return {
              value: product.id,
              displayText: `${product.name} [${product.reference}]`,
            };
          })
        );
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  let INITIAL_STATE = {
    billNumberPreamble: '', // TODO: THIS SHOULD TAKE THE PREAMBLE FROM THE LOCAL CONFIGURATION
    billNumber: '', // TODO: THIS SHOULD TAKE THE NEXT AVAILABLE NUMBER
    date: moment().format('YYYY-MM-DDTHH:mm'),
    entityData: {
      entity: '',
      fiscalData: {
        name: '',
        nif: '',
        address: EMPTY_ADDRESS,
      },
    },
    products: [],
    notes: '',
    basePrice: 0,
    generalDiscount: 0,
    pvp: 0,
    paymentData: {
      method: '',
      expirationDate: moment().format('YYYY-MM-DDTHH:mm'),
    },
    isPaid: false,
  };

  if (initialState) {
    INITIAL_STATE = {
      billNumberPreamble: initialState.billNumberPreamble,
      billNumber: initialState.billNumber,
      date: initialState.date,
      entityData: initialState.entityData,
      products: initialState.products,
      notes: initialState.notes,
      basePrice: initialState.basePrice,
      generalDiscount: initialState.generalDiscount,
      pvp: initialState.pvp,
      paymentData: initialState.paymentData,
      isPaid: initialState.isPaid,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    billNumberPreamble: Yup.string().default(''),
    billNumber: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    date: Yup.date().required(t('form.errors.required')),
    entityData: Yup.object().shape({
      entity: Yup.object().required(t('form.errors.required')),
      fiscalData: Yup.object().shape({
        name: Yup.string().required(t('form.errors.required')),
        nif: Yup.string().required(t('form.errors.required')),
        address: Yup.object().shape(AddressSchemaValidator(t)),
      }),
    }),
    products: Yup.array().of(
      Yup.object().shape({
        product: Yup.object().required(t('form.errors.required')),
        reference: Yup.string().required(t('form.errors.required')),
        name: Yup.string().required(t('form.errors.required')),
        basePricePerUnit: Yup.number()
          .typeError(t('form.errors.invalid_number'))
          .required(t('form.errors.required')),
        basePrice: Yup.number()
          .typeError(t('form.errors.invalid_number'))
          .required(t('form.errors.required')),
        unitType: Yup.string().required(t('form.errors.required')),
        discountPercentage: Yup.number()
          .typeError(t('form.errors.invalid_number'))
          .required(t('form.errors.required')),
        taxPercentage: Yup.number()
          .typeError(t('form.errors.invalid_number'))
          .required(t('form.errors.required')),
        quantity: Yup.number()
          .typeError(t('form.errors.invalid_number'))
          .required(t('form.errors.required')),
        pvp: Yup.number()
          .typeError(t('form.errors.invalid_number'))
          .required(t('form.errors.required')),
      })
    ),
    basePrice: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    generalDiscount: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    pvp: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    paymentData: Yup.object().shape({
      method: Yup.string().required(t('form.errors.required')),
      expirationDate: Yup.date().required(t('form.errors.required')),
    }),
    isPaid: Yup.bool().required(t('form.errors.required')),
    notes: Yup.string(),
  });

  const handleSubmit = (data) => {
    const encodedData = encodeProviderBill(data);

    if (!initialState) {
      addProviderBill(
        encodedData,
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
      updateProviderBill(
        { ...encodedData, _id: initialState._id },
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

  const handleProviderSelect = (providerId, setFieldValue) => {
    const selectedProvider = providerList.find(
      (provider) => provider.id === providerId
    );
    if (!selectedProvider) return;

    setFieldValue(
      'entityData.fiscalData.name',
      selectedProvider.fiscalData.name
    );
    setFieldValue('entityData.fiscalData.nif', selectedProvider.fiscalData.nif);
    setFieldValue(
      'entityData.fiscalData.address.roadType',
      selectedProvider.fiscalData.address.roadType
    );
    setFieldValue(
      'entityData.fiscalData.address.street',
      selectedProvider.fiscalData.address.street
    );
    setFieldValue(
      'entityData.fiscalData.address.number',
      selectedProvider.fiscalData.address.number
    );
    setFieldValue(
      'entityData.fiscalData.address.floor',
      selectedProvider.fiscalData.address.floor
    );
    setFieldValue(
      'entityData.fiscalData.address.door',
      selectedProvider.fiscalData.address.door
    );
    setFieldValue(
      'entityData.fiscalData.address.extra',
      selectedProvider.fiscalData.address.extra
    );
    setFieldValue(
      'entityData.fiscalData.address.zipCode',
      selectedProvider.fiscalData.address.zipCode
    );
    setFieldValue(
      'entityData.fiscalData.address.city',
      selectedProvider.fiscalData.address.city
    );
    setFieldValue(
      'entityData.fiscalData.address.province',
      selectedProvider.fiscalData.address.province
    );
    setFieldValue(
      'entityData.fiscalData.address.state',
      selectedProvider.fiscalData.address.state
    );
    setFieldValue(
      'entityData.fiscalData.address.country',
      selectedProvider.fiscalData.address.country
    );
  };

  const handleProductSelect = (productId, index, setFieldValue) => {
    const selectedProduct = productList.find(
      (product) => product.id === productId
    );

    const newBillProducts = billProducts;
    newBillProducts[index] = {
      basePricePerUnit: selectedProduct.buyingInfo.basePrice,
      unitType: selectedProduct.unitType.unit,
      discountPercentage: selectedProduct.buyingInfo.discountPercentage,
      taxPercentage: selectedProduct.buyingInfo.taxPercentage.percentage,
      quantity: 1,
    };
    setBillProducts(newBillProducts);

    setFieldValue(`products.${index}.reference`, selectedProduct.reference);
    setFieldValue(`products.${index}.name`, selectedProduct.name);
    setFieldValue(`products.${index}.unitType`, selectedProduct.unitType.unit);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            enableReinitialize
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <TextField
                      name="billNumberPreamble"
                      label={t(
                        'accounting_module.bill.structure.bill_number_preamble'
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      required
                      type="number"
                      name="billNumber"
                      label={t('accounting_module.bill.structure.bill_number')}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <DateTimePicker
                      required
                      name="date"
                      label={t('accounting_module.bill.structure.date')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.bill.creation.provider_data')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <AutocompleteSelect
                      required
                      name="entityData.entity"
                      label={t('accounting_module.bill.structure.provider')}
                      options={providerListOptions}
                      onInput={(providerId) =>
                        handleProviderSelect(providerId, setFieldValue)
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      required
                      name="entityData.fiscalData.name"
                      label={t(
                        'accounting_module.bill.structure.provider_name'
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      required
                      name="entityData.fiscalData.nif"
                      label={t('accounting_module.bill.structure.provider_nif')}
                    />
                  </Grid>

                  <AddressForm
                    parent="entityData.fiscalData.address"
                    disabled
                  />

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.bill.creation.products')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FieldArray
                      name="products"
                      render={(arrayHelpers) => (
                        <Grid container spacing={4}>
                          {values.products && values.products.length > 0 ? (
                            values.products.map((product, index) => (
                              <Grid item xs={12} key={index}>
                                <Grid container spacing={2} key={index}>
                                  <Grid item xs={10}>
                                    <AutocompleteSelect
                                      required
                                      name={`products.${index}.product`}
                                      label={t(
                                        'accounting_module.bill.structure.product'
                                      )}
                                      options={productListOptions}
                                      onInput={(productId) =>
                                        handleProductSelect(
                                          productId,
                                          index,
                                          setFieldValue
                                        )
                                      }
                                    />
                                  </Grid>

                                  <Grid item xs={1}>
                                    <Button
                                      color="secondary"
                                      className="h-100"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        const newBillProducts = billProducts;
                                        newBillProducts.splice(index, 1);
                                        setBillProducts(newBillProducts);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Grid>

                                  <Grid item xs={1}>
                                    <Button
                                      className="h-100"
                                      onClick={() => {
                                        arrayHelpers.insert(
                                          index,
                                          EMPTY_PRODUCT_IN_BILL
                                        );
                                        const newBillProducts = billProducts;
                                        newBillProducts.splice(
                                          index,
                                          0,
                                          EMPTY_PRODUCT_IN_BILL
                                        );
                                        setBillProducts(newBillProducts);
                                      }}
                                    >
                                      <AddIcon />
                                    </Button>
                                  </Grid>

                                  <Grid item xs={3}>
                                    <TextField
                                      disabled
                                      required
                                      name={`products.${index}.reference`}
                                      label={t(
                                        'accounting_module.product.structure.reference'
                                      )}
                                    />
                                  </Grid>

                                  <Grid item xs={9}>
                                    <TextField
                                      disabled
                                      required
                                      name={`products.${index}.name`}
                                      label={t(
                                        'accounting_module.product.structure.name'
                                      )}
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.basePricePerUnit`}
                                      label={t(
                                        'accounting_module.product.structure.base_price_per_unit',
                                        {
                                          currency,
                                        }
                                      )}
                                      value={
                                        billProducts[index]
                                          ? billProducts[index].basePricePerUnit
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBillProducts = billProducts;
                                        newBillProducts[
                                          index
                                        ].basePricePerUnit = event.target.value;
                                        setBillProducts(newBillProducts);
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.discountPercentage`}
                                      label={t(
                                        'accounting_module.product.structure.discount_percentage'
                                      )}
                                      value={
                                        billProducts[index]
                                          ? billProducts[index]
                                              .discountPercentage
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBillProducts = billProducts;
                                        newBillProducts[
                                          index
                                        ].discountPercentage =
                                          event.target.value;
                                        setBillProducts(newBillProducts);
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.taxPercentage`}
                                      label={t(
                                        'accounting_module.product.structure.tax_percentage'
                                      )}
                                      value={
                                        billProducts[index]
                                          ? billProducts[index].taxPercentage
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBillProducts = billProducts;
                                        newBillProducts[index].taxPercentage =
                                          event.target.value;
                                        setBillProducts(newBillProducts);
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.quantity`}
                                      label={t(
                                        'accounting_module.product.structure.quantity'
                                      )}
                                      value={
                                        billProducts[index]
                                          ? billProducts[index].quantity
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBillProducts = billProducts;
                                        newBillProducts[index].quantity =
                                          event.target.value;
                                        setBillProducts(newBillProducts);
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <TextField
                                      disabled
                                      required
                                      name={`products.${index}.unitType`}
                                      label={t(
                                        'accounting_module.product.structure.unit_type'
                                      )}
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <TextField
                                      disabled
                                      required
                                      type="number"
                                      name={`products.${index}.basePrice`}
                                      label={t(
                                        'accounting_module.product.structure.base_price',
                                        {
                                          currency,
                                        }
                                      )}
                                      value={
                                        billProducts[index]
                                          ? parseFloat(
                                              billProducts[index]
                                                .basePricePerUnit *
                                                billProducts[index].quantity *
                                                (1 -
                                                  billProducts[index]
                                                    .discountPercentage /
                                                    100)
                                            ).toFixed(numberOfDecimals)
                                          : ''
                                      }
                                    />
                                  </Grid>

                                  <Grid item xs={3}>
                                    <TextField
                                      disabled
                                      required
                                      type="number"
                                      name={`products.${index}.pvp`}
                                      label={t(
                                        'accounting_module.product.structure.pvp',
                                        {
                                          currency,
                                        }
                                      )}
                                      value={
                                        billProducts[index]
                                          ? parseFloat(
                                              billProducts[index]
                                                .basePricePerUnit *
                                                billProducts[index].quantity *
                                                (1 -
                                                  billProducts[index]
                                                    .discountPercentage /
                                                    100) *
                                                (1 +
                                                  billProducts[index]
                                                    .taxPercentage /
                                                    100)
                                            ).toFixed(numberOfDecimals)
                                          : ''
                                      }
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))
                          ) : (
                            <Grid item xs={12}>
                              <Button
                                onClick={() =>
                                  arrayHelpers.push(EMPTY_PRODUCT_IN_BILL)
                                }
                              >
                                {t('accounting_module.product.create')}
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.bill.creation.payment_data')}
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Select
                      required
                      name="paymentData.method"
                      label={t(
                        'accounting_module.bill.structure.payment_method'
                      )}
                      options={PAYMENT_METHODS(t)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <DateTimePicker
                      required
                      name="paymentData.expirationDate"
                      label={t(
                        'accounting_module.bill.structure.expiration_date'
                      )}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      disabled
                      name="basePrice"
                      type="number"
                      label={t(
                        'accounting_module.bill.structure.total_base_price',
                        {
                          currency,
                        }
                      )}
                      value={parseFloat(
                        billProducts
                          .map(
                            (product) =>
                              product.basePricePerUnit *
                              product.quantity *
                              (1 - product.discountPercentage / 100)
                          )
                          .reduce((acc, product) => acc + product, 0) *
                          (1 - generalDiscount / 100)
                      ).toFixed(numberOfDecimals)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      name="generalDiscount"
                      type="number"
                      label={t(
                        'accounting_module.bill.structure.general_discount'
                      )}
                      value={generalDiscount}
                      onInput={(event) =>
                        setGeneralDiscount(event.target.value)
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      disabled
                      name="pvp"
                      type="number"
                      label={t('accounting_module.bill.structure.pvp', {
                        currency,
                      })}
                      value={parseFloat(
                        billProducts
                          .map(
                            (product) =>
                              product.basePricePerUnit *
                              product.quantity *
                              (1 - product.discountPercentage / 100) *
                              (1 + product.taxPercentage / 100)
                          )
                          .reduce((acc, product) => acc + product, 0) *
                          (1 - generalDiscount / 100)
                      ).toFixed(numberOfDecimals)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Switch
                      name="isPaid"
                      label={t('accounting_module.bill.structure.is_paid')}
                      initialState={INITIAL_STATE.isPaid}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={5}
                      name="notes"
                      label={t('accounting_module.bill.structure.notes')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <SubmitButton>
                      {initialState ? t('buttons.save') : t('buttons.create')}
                    </SubmitButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateProviderBill;
