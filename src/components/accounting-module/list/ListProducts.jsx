import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../forms-ui/Button'


const ListProducts = () => {
    const {t} = useTranslation()

    return(
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth={false}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button component={Link} to='/create/product'>{t('accounting_module.product.create_product')}</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ListProducts