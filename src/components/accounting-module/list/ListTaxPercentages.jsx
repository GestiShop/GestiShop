import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/forms/Button'
import SearchBar from '../../ui/SearchBar'
import Table from '../../ui/Table'
import FullScreenDialog from '../../ui/FullscreenDialog'
import CreateTaxPercentage from '../create/CreateTaxPercentage'
import { fetchTaxPercentages } from '../../../db/TaxPercentageHelper'


const headers = [
    {id: 'reference', label: 'Reference', align: 'left'},
    {id: 'percentage', label: 'Percentage (%)', align: 'right'},
]

const ListTaxPercentages = () => {
    const {t} = useTranslation()
    const [openCreationDialog, setOpenCreationDialog] = useState(false)
    const [rows, setRows] = useState([])

    fetchTaxPercentages((error) => {
        console.log('error', error)
    }, (data) => {
        setRows(data)
    })

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
                                <Button onClick={() => setOpenCreationDialog(true)} className="m-auto">
                                    {t('accounting_module.tax_percentage.create_tax_percentage')}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>

                            </Grid>
                            <Grid item xs={3}>
                                <SearchBar onSubmit={handleSearch}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Table rows={rows} headers={headers} title="Tax percentages" editCallback={handleEdit}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <FullScreenDialog
                open={openCreationDialog}
                closeCallback={() => setOpenCreationDialog(false)}
                title={t('accounting_module.tax_percentage.create_tax_percentage')}
                childComponent={<CreateTaxPercentage/>}
            />
        </>
    )
}

export default ListTaxPercentages