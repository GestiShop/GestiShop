/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FieldArray } from 'formik';
import { Container, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from '../../ui/forms/TextField';
import SubmitButton from '../../ui/forms/SubmitButton';
import Switch from '../../ui/forms/Switch';
import { addClientBill, updateClientBill } from '../../../db/ClientBillHelper';
import { fetchClients } from '../../../db/ClientHelper';
import { fetchProducts } from '../../../db/ProductHelper';
import DatePicker from '../../ui/forms/DatePicker';
import AutocompleteSelect from '../../ui/forms/AutocompleteSelect';
import AddressForm from '../../ui/AddressForm';
import useIsMounted from '../../../utils/useIsMounted';
import { EmptyAddress, EmptyBillProduct } from '../../../utils/constants';
import Button from '../../ui/forms/Button';

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

const CreateClient = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const [clientList, setClientList] = useState([]);
  const [clientListOptions, setClientListOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListOptions, setProductListOptions] = useState([]);

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
    date: getCurrentDate(),
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
    generalDiscount: 0,
    paymentData: {},
    isPaid: false,
  };
  if (initialState) {
    INITIAL_STATE = {
      billNumber: initialState.billNumber,
      date: initialState.date,
      entityData: initialState.entityData,
      products: initialState.products,
      notes: initialState.notes,
      generalDiscount: initialState.generalDiscount,
      paymentData: initialState.paymentData,
      isPaid: initialState.isPaid,
    };
  }

  // TODO: FINISH
  const FORM_VALIDATION = Yup.object().shape({
    billNumber: Yup.string().required(t('form.errors.required')),
    date: Yup.date()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    entity: Yup.object().required(t('form.errors.required')),
    products: Yup.array().of(Yup.object()),
    notes: Yup.string(),
    generalDiscount: Yup.number().typeError(t('form.errors.invalid_number')),
    paymentData: Yup.object().shape({}),
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

  const handleProductSelect = (productId, setFieldValue) => {
    const selectedProduct = productList.find(
      (product) => product.id === productId
    );
    console.log(selectedProduct);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="billNumber"
                      label={`${t(
                        'accounting_module.bill.structure.bill_number'
                      )} *`}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <DatePicker
                      name="date"
                      label={`${t('accounting_module.bill.structure.date')} *`}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.bill.creation.client_data')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <AutocompleteSelect
                      name="entityData.entity"
                      label={`${t(
                        'accounting_module.bill.structure.client'
                      )} *`}
                      options={clientListOptions}
                      onInput={(clientId) =>
                        handleClientSelect(clientId, setFieldValue)
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      name="entityData.fiscalData.name"
                      label={`${t(
                        'accounting_module.bill.structure.client_name'
                      )} *`}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      name="entityData.fiscalData.nif"
                      label={`${t(
                        'accounting_module.bill.structure.client_nif'
                      )} *`}
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
                        <div>
                          {values.products && values.products.length > 0 ? (
                            values.products.map((product, index) => (
                              <Grid container spacing={2} key={index}>
                                <Grid item xs={10}>
                                  <AutocompleteSelect
                                    name={`products.${index}.product`}
                                    label={`${t(
                                      'accounting_module.bill.structure.product'
                                    )} *`}
                                    options={productListOptions}
                                    onInput={(productId) =>
                                      handleProductSelect(
                                        productId,
                                        setFieldValue
                                      )
                                    }
                                  />
                                </Grid>

                                <Grid item xs={1}>
                                  <Button
                                    className="h-100"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
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
                                    +
                                  </Button>
                                </Grid>
                              </Grid>
                            ))
                          ) : (
                            <Button
                              onClick={() =>
                                arrayHelpers.push(EmptyBillProduct)
                              }
                            >
                              Add a product
                            </Button>
                          )}
                        </div>
                      )}
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
                    <Typography>
                      {t('accounting_module.bill.creation.payment_data')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    Payment data form
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="generalDiscount"
                      type="number"
                      label={t(
                        'accounting_module.bill.structure.general_discount'
                      )}
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
