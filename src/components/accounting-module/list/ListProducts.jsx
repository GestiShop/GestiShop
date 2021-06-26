import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/forms/Button'
import SearchBar from '../../ui/SearchBar'
import Table from '../../ui/Table'

const rows = [
    {
        reference: 'PROD000',
        name: 'Product 000',
        stock: 12,
        price: 26.98,
        state: 'Available',
        date: '26-10-1999'
    },
    {
        reference: 'PROD001',
        name: 'Product 001',
        stock: 24,
        price: 28.99,
        state: 'Not available',
        date: '28-10-1999'
    }
]

const headers = [
    {id: 'reference', numeric: false, disablePadding: false, label: 'Reference'},
    {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
    {id: 'stock', numeric: true, disablePadding: false, label: 'Stock'},
    {id: 'price', numeric: true, disablePadding: false, label: 'Price (€)'},
    {id: 'state', numeric: false, disablePadding: false, label: 'State'},
    {id: 'date', numeric: false, disablePadding: false, label: 'Date'},
]

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
                            <Table rows={rows} headers={headers} title='Products'/>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ListProducts