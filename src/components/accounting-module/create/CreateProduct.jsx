import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Container, Grid } from '@material-ui/core'
import TextField from '../../ui/forms/TextField'
import { useTranslation } from 'react-i18next'
import SubmitButton from '../../ui/forms/SubmitButton'
import Select from '../../ui/forms/Select'
import MultiSelect from '../../ui/forms/MultiSelect'
import Switch from '../../ui/forms/Switch'
import { addProduct } from '../../../db/ProductHelper'


const CreateProduct = () => {
    const {t} = useTranslation()
    const [stockAlert, setStockAlert] = useState(false)

    const INITIAL_STATE = {
        reference: '',
        name: '',
        basePrice: 0.00,
        discountPercentage: 0.00,
        taxPercentage: 0.00,
        stock: 0.00,
        unitType: '',
        warehouse: '',
        categories: [],
        visible: true,
        stockAlert: false,
        minStock: 0.00
    }

    const FORM_VALIDATION = Yup.object().shape({
        reference: Yup.string()
            .required(t('form.errors.required')),
        name: Yup.string()
            .required(t('form.errors.required')),
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
        unitType: Yup.string()
            .required(t('form.errors.required')),
        warehouse: Yup.string()
            .required(t('form.errors.required')),
        categories: Yup.array(),
        visible: Yup.bool(),
        stockAlert: Yup.bool(),
        minStock: Yup.number()
            .typeError(t('form.errors.invalid_number'))
            .required(t('form.errors.required'))
    })

    const handleSubmit = (data) => {
        addProduct(data, (error) => {
            console.log("error", error)
        })
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <Formik
                        initialValues={{
                            ...INITIAL_STATE
                        }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={values => {
                            handleSubmit(values)
                        }}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <TextField
                                        name="reference"
                                        label="Product Reference"
                                    />
                                </Grid>

                                <Grid item xs={9}>
                                    <TextField
                                        name="name"
                                        label="Product Name"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="basePrice"
                                        label="Product Base Price"
                                    />
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
                                        options={['21.00', '10.00', '0.00']}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        name="stock"
                                        label="Product Stock"
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Select
                                        name="unitType"
                                        label="Unit type"
                                        options={['units', 'm', 'kg']}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Select
                                        name="warehouse"
                                        label="Warehouse"
                                        options={['default warehouse', 'another warehouse']}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <MultiSelect
                                        name="categories"
                                        label="Categories"
                                        options={['test', 'wow', 'lol', 'category', 'random']}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Switch
                                        name="visible"
                                        label="Visible"
                                        initialState={true}
                                    />
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
                                    <SubmitButton>
                                        {t('buttons.create')}
                                    </SubmitButton>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Container>
            </Grid>
        </Grid>
    )
}

export default CreateProduct