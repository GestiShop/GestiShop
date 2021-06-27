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
    {id: 'reference', label: 'Reference', align: 'left'},
    {id: 'name', label: 'Name', align: 'left'},
    {id: 'stock', label: 'Stock', align: 'right'},
    {id: 'price', label: 'Price (€)', align: 'right'},
    {id: 'state', label: 'State', align: 'left'},
    {id: 'date', label: 'Date', align: 'left'}
]

const ListProducts = () => {
    const {t} = useTranslation()

    const handleSearch = (textToSearch) => {
        console.log('Searching: \'' + textToSearch + '\'')
    }

    const handleEdit = (index) => {
        console.log('Edit row: ' + index)
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
                            <Table rows={rows} headers={headers} title="Products" editCallback={handleEdit}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

export default ListProducts