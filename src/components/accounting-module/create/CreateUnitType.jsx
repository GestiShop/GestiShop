import React from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Container, Grid } from '@material-ui/core'
import TextField from '../../ui/forms/TextField'
import { useTranslation } from 'react-i18next'
import SubmitButton from '../../ui/forms/SubmitButton'
import { addTax } from '../../../db/TaxHelper'
import { addUnitType } from '../../../db/UnitTypeHelper'


const CreateUnitType = () => {
    const {t} = useTranslation()

    const INITIAL_STATE = {
        reference: '',
        unit: ''
    }

    const FORM_VALIDATION = Yup.object().shape({
        reference: Yup.string()
            .required(t('form.errors.required')),
        unit: Yup.string()
            .required(t('form.errors.required')),
    })

    const handleSubmit = (data) => {
        addUnitType(data, (error) => {
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
                                        label="Tax percentage reference"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="unit"
                                        label="Unit"
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

export default CreateUnitType