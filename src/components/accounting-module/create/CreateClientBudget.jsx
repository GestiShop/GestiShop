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
import {
  addClientBudget,
  updateClientBudget,
} from '../../../db/ClientBudgetHelper';
import { fetchClients } from '../../../db/ClientHelper';
import { fetchProducts } from '../../../db/ProductHelper';
import DateTimePicker from '../../ui/forms/DateTimePicker';
import AutocompleteSelect from '../../ui/forms/AutocompleteSelect';
import AddressForm from '../../ui/AddressForm';
import useIsMounted from '../../../utils/useIsMounted';
import {
  EmptyAddress,
  EmptyBudgetProduct,
  AddressSchemaValidator,
} from '../../../utils/constants';
import Button from '../../ui/forms/Button';

const CreateClientBudget = ({ closeCallback, initialState }) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const [clientList, setClientList] = useState([]);
  const [clientListOptions, setClientListOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListOptions, setProductListOptions] = useState([]);
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );
  const [budgetProducts, setBudgetProducts] = useState([]);
  const [generalDiscount, setGeneralDiscount] = useState(0);

  const encodeProduct = (data, i) => {
    return {
      product: data.product.value,
      reference: data.reference,
      name: data.name,
      basePricePerUnit: budgetProducts[i].basePricePerUnit,
      unitType: data.unitType,
      discountPercentage: budgetProducts[i].discountPercentage,
      taxPercentage: budgetProducts[i].taxPercentage,
      quantity: budgetProducts[i].quantity,
    };
  };

  const encodeClientBudget = (data) => {
    return {
      budgetNumberPreamble: data.budgetNumberPreamble,
      budgetNumber: data.budgetNumber,
      date: data.date,
      expirationDate: data.expirationDate,
      entityData: {
        entity: data.entityData.entity.value,
        fiscalData: data.entityData.fiscalData,
      },
      products: data.products.map(encodeProduct),
      notes: data.notes,
      basePrice:
        budgetProducts
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
        budgetProducts
          .map(
            (product) =>
              product.basePricePerUnit *
              product.quantity *
              (1 - product.discountPercentage / 100) *
              (1 + product.taxPercentage / 100)
          )
          .reduce((acc, product) => acc + product, 0) *
        (1 - generalDiscount / 100),
    };
  };

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

  let INITIAL_STATE = {
    budgetNumberPreamble: '', // TODO: THIS SHOULD TAKE THE PREAMBLE FROM THE LOCAL CONFIGURATION
    budgetNumber: '', // TODO: THIS SHOULD TAKE THE NEXT AVAILABLE NUMBER
    date: moment().format('YYYY-MM-DDTHH:mm'),
    expirationDate: moment().format('YYYY-MM-DDTHH:mm'),
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
  };

  if (initialState) {
    INITIAL_STATE = {
      budgetNumberPreamble: initialState.budgetNumberPreamble,
      budgetNumber: initialState.budgetNumber,
      date: initialState.date,
      expirationDate: initialState.expirationDate,
      entityData: initialState.entityData,
      products: initialState.products,
      notes: initialState.notes,
      basePrice: initialState.basePrice,
      generalDiscount: initialState.generalDiscount,
      pvp: initialState.pvp,
    };
  }

  const FORM_VALIDATION = Yup.object().shape({
    budgetNumberPreamble: Yup.string().default(''),
    budgetNumber: Yup.number()
      .typeError(t('form.errors.invalid_number'))
      .required(t('form.errors.required')),
    date: Yup.date().required(t('form.errors.required')),
    expirationDate: Yup.date(),
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
    notes: Yup.string(),
  });

  const handleSubmit = (data) => {
    const encodedData = encodeClientBudget(data);

    if (!initialState) {
      addClientBudget(
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
      updateClientBudget(
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

    const newBudgetProducts = budgetProducts;
    newBudgetProducts[index] = {
      basePricePerUnit: selectedProduct.sellingInfo.basePrice,
      unitType: selectedProduct.unitType.unit,
      discountPercentage: selectedProduct.sellingInfo.discountPercentage,
      taxPercentage: selectedProduct.sellingInfo.taxPercentage.percentage,
      quantity: 1,
    };
    setBudgetProducts(newBudgetProducts);

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
                      name="budgetNumberPreamble"
                      label={t(
                        'accounting_module.budget.structure.budget_number_preamble'
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      required
                      type="number"
                      name="budgetNumber"
                      label={t(
                        'accounting_module.budget.structure.budget_number'
                      )}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <DateTimePicker
                      required
                      name="date"
                      label={t('accounting_module.budget.structure.date')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.budget.creation.client_data')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <AutocompleteSelect
                      required
                      name="entityData.entity"
                      label={t('accounting_module.budget.structure.client')}
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
                      label={t(
                        'accounting_module.budget.structure.client_name'
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      required
                      name="entityData.fiscalData.nif"
                      label={t('accounting_module.budget.structure.client_nif')}
                    />
                  </Grid>

                  <AddressForm
                    parent="entityData.fiscalData.address"
                    disabled
                  />

                  <Grid item xs={12}>
                    <Typography>
                      {t('accounting_module.budget.creation.products')}
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
                                        'accounting_module.budget.structure.product'
                                      )}
                                      options={productListOptions}
                                      onInput={(productId) => {
                                        handleProductSelect(
                                          productId,
                                          index,
                                          setFieldValue
                                        );
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={1}>
                                    <Button
                                      color="secondary"
                                      className="h-100"
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                        const newBudgetProducts =
                                          budgetProducts;
                                        newBudgetProducts.splice(index, 1);
                                        setBudgetProducts(newBudgetProducts);
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
                                          EmptyBudgetProduct
                                        );
                                        const newBudgetProducts =
                                          budgetProducts;
                                        newBudgetProducts.splice(
                                          index,
                                          0,
                                          EmptyBudgetProduct
                                        );
                                        setBudgetProducts(newBudgetProducts);
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
                                        budgetProducts[index]
                                          ? budgetProducts[index]
                                              .basePricePerUnit
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBudgetProducts =
                                          budgetProducts;
                                        newBudgetProducts[
                                          index
                                        ].basePricePerUnit = event.target.value;
                                        setBudgetProducts(newBudgetProducts);
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
                                        budgetProducts[index]
                                          ? budgetProducts[index]
                                              .discountPercentage
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBudgetProducts =
                                          budgetProducts;
                                        newBudgetProducts[
                                          index
                                        ].discountPercentage =
                                          event.target.value;
                                        setBudgetProducts(newBudgetProducts);
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
                                        budgetProducts[index]
                                          ? budgetProducts[index].taxPercentage
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBudgetProducts =
                                          budgetProducts;
                                        newBudgetProducts[index].taxPercentage =
                                          event.target.value;
                                        setBudgetProducts(newBudgetProducts);
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
                                        budgetProducts[index]
                                          ? budgetProducts[index].quantity
                                          : ''
                                      }
                                      onInput={(event) => {
                                        const newBudgetProducts =
                                          budgetProducts;
                                        newBudgetProducts[index].quantity =
                                          event.target.value;
                                        setBudgetProducts(newBudgetProducts);
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
                                        budgetProducts[index]
                                          ? parseFloat(
                                              budgetProducts[index]
                                                .basePricePerUnit *
                                                budgetProducts[index].quantity *
                                                (1 -
                                                  budgetProducts[index]
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
                                        budgetProducts[index]
                                          ? parseFloat(
                                              budgetProducts[index]
                                                .basePricePerUnit *
                                                budgetProducts[index].quantity *
                                                (1 -
                                                  budgetProducts[index]
                                                    .discountPercentage /
                                                    100) *
                                                (1 +
                                                  budgetProducts[index]
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
                                  arrayHelpers.push(EmptyBudgetProduct)
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

                  <Grid item xs={4}>
                    <TextField
                      disabled
                      name="basePrice"
                      type="number"
                      label={t(
                        'accounting_module.budget.structure.total_base_price',
                        {
                          currency,
                        }
                      )}
                      value={parseFloat(
                        budgetProducts
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
                        'accounting_module.budget.structure.general_discount'
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
                      label={t('accounting_module.budget.structure.pvp', {
                        currency,
                      })}
                      value={parseFloat(
                        budgetProducts
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

                  <Grid item xs={12}>
                    <DateTimePicker
                      name="expirationDate"
                      label={t(
                        'accounting_module.budget.structure.expiration_date'
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={5}
                      name="notes"
                      label={t('accounting_module.budget.structure.notes')}
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

export default CreateClientBudget;
