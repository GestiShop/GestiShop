import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Container, Grid } from '@material-ui/core'
import TextField from '../../ui/forms/TextField'
import { useTranslation } from 'react-i18next'
import SubmitButton from '../../ui/forms/SubmitButton'
import { addTax } from '../../../db/TaxHelper'


const CreateTax = () => {
    const {t} = useTranslation()

    const INITIAL_STATE = {
        reference: '',
        percentage: 0.00
    }

    const FORM_VALIDATION = Yup.object().shape({
        reference: Yup.string()
            .required(t('form.errors.required')),
        percentage: Yup.number()
            .typeError(t('form.errors.invalid_number'))
            .required(t('form.errors.required'))
    })

    const handleSubmit = (data) => {
        addTax(data, (error) => {
            console.log('error', error)
        }, () => {
            console.log('NO ERROR')
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
                        onSubmit={values => handleSubmit(values)}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        name="reference"
                                        label={t('accounting_module.tax.list.headers.reference')}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="percentage"
                                        label={t('accounting_module.tax.list.headers.percentage')}
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

export default CreateTax