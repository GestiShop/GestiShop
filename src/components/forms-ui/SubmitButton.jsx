import React from 'react'
import Button from './Button'
import { useFormikContext } from 'formik'

const SubmitButtonWrapper = ({children, ...otherProps}) => {
    const {submitForm} = useFormikContext()

    const handleSubmit = () => {
        submitForm()
    }

    const configButton = {
        ...otherProps,
        onClick: handleSubmit
    }

    return (
        <Button {...configButton}>
            {children}
        </Button>
    )
}

export default SubmitButtonWrapper