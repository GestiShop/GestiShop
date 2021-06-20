import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Container, Grid, Typography } from '@material-ui/core'
import TextField from '../../forms-ui/TextField'
import { useTranslation } from 'react-i18next'
import Button from '../../forms-ui/Button'


const CreateProduct = () => {
    const {t} = useTranslation()

    const INITIAL_STATE = {
        reference: '',
        name: '',
        attributes: '',
        basePrice: 0.00,
        unitType: '',
        discountPercentage: 0.00,
        taxPercentage: 0.00,
        warehouse: ''
    }

    const FORM_VALIDATION = Yup.object().shape({
        reference: Yup.string()
            .required(t('form.errors.required')),
        name: Yup.string()
            .required(t('form.errors.required')),
        attributes: Yup.string()
            .required(t('form.errors.required')),
        basePrice: Yup.number()
            .typeError(t('form.errors.invalid_number'))
            .required(t('form.errors.required')),
        unitType: Yup.string()
            .required(t('form.errors.required')),
        discountPercentage: Yup.number()
            .typeError(t('form.errors.invalid_number'))
            .required(t('form.errors.required')),
        taxPercentage: Yup.number()
            .typeError(t('form.errors.invalid_number'))
            .required(t('form.errors.required')),
        warehouse: Yup.string()
            .required(t('form.errors.required'))
    })

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <Formik
                        initialValues={{
                            ...INITIAL_STATE
                        }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={values => {
                            console.log(values)
                        }}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography>
                                        Product Information
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="reference"
                                        label="Product Reference"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="attributes"
                                        label="Attributes"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="warehouse"
                                        label="Warehouse"
                                    />
                                </Grid>

                                <Grid item xs={12}>
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

                                <Grid item xs={6}>
                                    <TextField
                                        name="unitType"
                                        label="Unit type"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="discountPercentage"
                                        label="Discount Percentage"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="taxPercentage"
                                        label="Tax Percentage"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button>
                                        {t('buttons.create')}
                                    </Button>
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