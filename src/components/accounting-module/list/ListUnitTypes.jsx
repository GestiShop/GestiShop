import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GenericListComponent from './GenericListComponent'
import { fetchUnitTypes } from '../../../db/UnitTypeHelper'
import CreateUnitType from '../create/CreateUnitType'


const ListUnitTypes = () => {
    const {t} = useTranslation()
    const [rows, setRows] = useState([])

    const headers = [
        {id: 'reference', label: t('accounting_module.unit_type.list.headers.reference'), align: 'left'},
        {id: 'unit', label: t('accounting_module.unit_type.list.headers.unit'), align: 'left'},
    ]

    fetchUnitTypes((error) => {
        console.log('error', error)
    }, (data) => {
        setRows(data)
    })

    const handleSearch = (textToSearch) => {
        console.log('Searching text:', textToSearch)
    }

    const handleEdit = (index) => {
        console.log('Edit row:', index)
    }

    const handleDelete = (indexes) => {
        console.log('Delete rows:', indexes)
    }

    return (
        <GenericListComponent
            rows={rows}
            headers={headers}
            searchCallback={handleSearch}
            editCallback={handleEdit}
            deleteCallback={handleDelete}
            texts={{
                create: t('accounting_module.unit_type.create'),
                title: t('accounting_module.unit_type.list.title')
            }}
            creationComponent={<CreateUnitType/>}
        />
    )
}

export default ListUnitTypes