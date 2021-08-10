/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import { Form, Formik, FieldArray } from 'formik';
import { Container, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import Switch from '../../ui/forms/Switch';
import { addClientBill, updateClientBill } from '../../../db/ClientBillHelper';
import { fetchClients } from '../../../db/ClientHelper';
import { fetchProducts } from '../../../db/ProductHelper';
import DatePicker from '../../ui/forms/DatePicker';
import DateTimePicker from '../../ui/forms/DateTimePicker';
import AutocompleteSelect from '../../ui/forms/AutocompleteSelect';
import Select from '../../ui/forms/Select';
import AddressForm from '../../ui/AddressForm';
import useIsMounted from '../../../utils/useIsMounted';
import { EmptyAddress, EmptyBillProduct } from '../../../utils/constants';
import Button from '../../ui/forms/Button';
import PAYMENT_METHODS from '../../../../assets/payment_methods';

const CreateClient = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const [clientList, setClientList] = useState([]);
  const [clientListOptions, setClientListOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListOptions, setProductListOptions] = useState([]);
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );

  const fetchData = () => {
    fetchClients(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current) {
          setClientList(options);
          setClientListOptions(
            options.map((client) => {
              return {
                value: client.id,
                displayText: `${client.fiscalData.name} [${client.reference}]`,
              };
            })
          );
        }
      }
    );

    fetchProducts(
      (error) => {
        console.log('error', error);
        closeCallback();
      },
      (options) => {
        if (isMounted.current) {
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
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: FINISH STRUCTURE
  let INITIAL_STATE = {
    billNumber: '',
    date: moment().format('YYYY-MM-DD'),
    entityData: {
      entity: '',
      fiscalData: {
        name: '',
        nif: '',
        address: EmptyAddress,
      },
    },
    products: [],
    notes: '',
    basePrice: 0,
    generalDiscount: 0,
    pvp: 0,
    paymentData: {
      method: '',
      expirationDate: moment().format('YYYY-MM-DDTHH:MM'),
    },
    isPaid: false,
  };

  if (initialState) {
    INITIAL_STATE = {
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

  // TODO: FINISH
  const FORM_VALIDATION = Yup.object().shape({
    billNumber: Yup.string().required(t('form.errors.required')),
    date: Yup.date().required(t('form.errors.required')),
    entity: Yup.object().required(t('form.errors.required')),
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
    notes: Yup.string(),
    basePrice: Yup.number().typeError(t('form.errors.invalid_number')),
    generalDiscount: Yup.number().typeError(t('form.errors.invalid_number')),
    pvp: Yup.number().typeError(t('form.errors.invalid_number')),
    paymentData: Yup.object().shape({
      method: Yup.object().required(t('form.errors.required')),
      expirationDate: Yup.date().required(t('form.errors.required')),
    }),
    isPaid: Yup.bool().required(t('form.errors.required')),
  });

  const handleSubmit = (data) => {
    if (!initialState) {
      addClientBill(
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
      updateClientBill(
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

  const handleClientSelect = (clientId, setFieldValue) => {
    const selectedClient = clientList.find((client) => client.id === clientId);
    if (!selectedClient) return;

    setFieldValue('entityData.fiscalData.name', selectedClient.fiscalData.name);
    setFieldValue('entityData.fiscalData.nif', selectedClient.fiscalData.nif);
    setFieldValue(
      'entityData.fiscalData.address.roadType',
      selectedClient.fiscalData.address.roadType
    );
    setFieldValue(
      'entityData.fiscalData.address.street',
      selectedClient.fiscalData.address.street
    );
    setFieldValue(
      'entityData.fiscalData.address.number',
      selectedClient.fiscalData.address.number
    );
    setFieldValue(
      'entityData.fiscalData.address.floor',
      selectedClient.fiscalData.address.floor
    );
    setFieldValue(
      'entityData.fiscalData.address.door',
      selectedClient.fiscalData.address.door
    );
    setFieldValue(
      'entityData.fiscalData.address.extra',
      selectedClient.fiscalData.address.extra
    );
    setFieldValue(
      'entityData.fiscalData.address.zipCode',
      selectedClient.fiscalData.address.zipCode
    );
    setFieldValue(
      'entityData.fiscalData.address.city',
      selectedClient.fiscalData.address.city
    );
    setFieldValue(
      'entityData.fiscalData.address.province',
      selectedClient.fiscalData.address.province
    );
    setFieldValue(
      'entityData.fiscalData.address.state',
      selectedClient.fiscalData.address.state
    );
    setFieldValue(
      'entityData.fiscalData.address.country',
      selectedClient.fiscalData.address.country
    );
  };

  const handleProductSelect = (productId, index, setFieldValue) => {
    const selectedProduct = productList.find(
      (product) => product.id === productId
    );

    setFieldValue(`products.${index}.reference`, selectedProduct.reference);
    setFieldValue(`products.${index}.name`, selectedProduct.name);
    setFieldValue(
      `products.${index}.basePricePerUnit`,
      selectedProduct.sellingInfo.basePricePerUnit
    );
    setFieldValue(
      `products.${index}.discountPercentage`,
      selectedProduct.sellingInfo.discountPercentage
    );
    setFieldValue(
      `products.${index}.taxPercentage`,
      selectedProduct.sellingInfo.taxPercentage.percentage
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            enableReinitialize
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      name="billNumber"
                      label={t('accounting_module.bill.structure.bill_number')}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <DatePicker
                      required
                      name="date"
                      label={t('accounting_module.bill.structure.date')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.bill.creation.client_data')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <AutocompleteSelect
                      required
                      name="entityData.entity"
                      label={t('accounting_module.bill.structure.client')}
                      options={clientListOptions}
                      onInput={(clientId) =>
                        handleClientSelect(clientId, setFieldValue)
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      required
                      name="entityData.fiscalData.name"
                      label={t('accounting_module.bill.structure.client_name')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      required
                      name="entityData.fiscalData.nif"
                      label={t('accounting_module.bill.structure.client_nif')}
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
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Grid>

                                  <Grid item xs={1}>
                                    <Button
                                      className="h-100"
                                      onClick={() =>
                                        arrayHelpers.insert(
                                          index,
                                          EmptyBillProduct
                                        )
                                      }
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
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      disabled
                                      required
                                      type="number"
                                      name={`products.${index}.taxPercentage`}
                                      label={t(
                                        'accounting_module.product.structure.tax_percentage'
                                      )}
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.quantity`}
                                      label={t(
                                        'accounting_module.product.structure.quantity'
                                      )}
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.basePrice`}
                                      label={t(
                                        'accounting_module.product.structure.base_price',
                                        {
                                          currency,
                                        }
                                      )}
                                    />
                                  </Grid>

                                  <Grid item xs={4}>
                                    <TextField
                                      required
                                      type="number"
                                      name={`products.${index}.pvp`}
                                      label={t(
                                        'accounting_module.product.structure.pvp',
                                        {
                                          currency,
                                        }
                                      )}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))
                          ) : (
                            <Grid item xs={12}>
                              <Button
                                onClick={() =>
                                  arrayHelpers.push(EmptyBillProduct)
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
                      acceptNone
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

                  <Grid item xs={12}>
                    Payment data form
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
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      name="generalDiscount"
                      type="number"
                      label={t(
                        'accounting_module.bill.structure.general_discount'
                      )}
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

export default CreateClient;
