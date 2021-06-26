import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/forms/Button'
import SearchBar from '../../ui/SearchBar'


const ListProducts = () => {
    const {t} = useTranslation()

    const handleSearch = (textToSearch) => {
        console.log('Searching: \'' + textToSearch + '\'')
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth={false}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Button component={Link}
                                    to="/create/product">{t('accounting_module.product.create_product')}</Button>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={3}>
                            <SearchBar onSubmit={handleSearch}/>
                        </Grid>

                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ListProducts