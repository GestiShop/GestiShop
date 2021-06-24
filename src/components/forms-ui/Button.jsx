import React from 'react'
import { Button } from '@material-ui/core'

const ButtonWrapper = ({children, ...otherProps}) => {
    const configButton = {
        ...otherProps,
        variant: 'contained',
        color: 'primary',
        fullWidth: true,
    }

    return (
        <Button {...configButton}>
            {children}
        </Button>
    )
}

export default ButtonWrapper