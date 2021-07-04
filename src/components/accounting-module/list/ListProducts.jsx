import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/forms/Button'
import SearchBar from '../../ui/SearchBar'
import Table from '../../ui/Table'
import FullScreenDialog from '../../ui/FullscreenDialog'
import CreateProduct from '../create/CreateProduct'


const rows = [
    {
        reference: 'PROD000',
        name: 'Product 000',
        basePrice: 26.98,
        stock: 10,
        unitType: 'kg',
        discountPercentage: 0.0,
        taxPercentage: 21.0,
        minStock: 12,
        stockAlert: true,
        visible: true
    },
    {
        reference: 'PROD001',
        name: 'Product 001',
        basePrice: 22.98,
        stock: 18,
        unitType: 'units',
        discountPercentage: 0.0,
        taxPercentage: 21.0,
        minStock: 50,
        stockAlert: false,
        visible: true
    }
]

const headers = [
    {id: 'reference', label: 'Reference', align: 'left'},
    {id: 'name', label: 'Name', align: 'left'},
    {id: 'basePrice', label: 'Price (€)', align: 'right'},
    {id: 'stock', label: 'Stock', align: 'right'},
    {id: 'visible', label: 'State', align: 'left'}
]

const ListProducts = () => {
    const {t} = useTranslation()
    const [openCreationDialog, setOpenCreationDialog] = React.useState(false)

    const handleClickCreateProduct = () => {
        setOpenCreationDialog(true)
    }

    const handleCloseCreateProduct = (newProductAdded) => {
        setOpenCreationDialog(false)
        if (newProductAdded) {
            // TODO: UPDATE TABLE
        }
        console.log('Should create new product: ' + newProductAdded)
    }

    const handleSearch = (textToSearch) => {
        console.log('Searching: \'' + textToSearch + '\'')
    }

    const handleEdit = (index) => {
        console.log('Edit row: ' + index)
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={3} className="d-flex">
                                <Button onClick={handleClickCreateProduct} className="m-auto">
                                    {t('accounting_module.product.create_product')}
                                </Button>
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
            <FullScreenDialog
                open={openCreationDialog}
                closeCallback={handleCloseCreateProduct}
                title={t('accounting_module.product.create_product')}
                childComponent={<CreateProduct/>}
            />
        </>
    )
}

export default ListProducts