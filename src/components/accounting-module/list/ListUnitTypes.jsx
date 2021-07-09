import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { fetchUnitTypes } from '../../../db/UnitTypeHelper';
import CreateUnitType from '../create/CreateUnitType';
import useIsMounted from '../../../utils/useIsMounted';

const ListUnitTypes = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.unit_type.list.headers.reference'),
      align: 'left',
    },
    {
      id: 'unit',
      label: t('accounting_module.unit_type.list.headers.unit'),
      align: 'left',
    },
  ];

  const fetchData = () => {
    fetchUnitTypes(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    fetchData();
  };

  const handleSearch = (textToSearch) => {
    console.log('Searching text:', textToSearch);
  };

  const handleDelete = (indexes) => {
    console.log('Delete rows:', indexes);
    fetchData();
  };

  return (
    <GenericListComponent
      rows={rows}
      headers={headers}
      editCallback={handleEdit}
      searchCallback={handleSearch}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.unit_type.create'),
        title: t('accounting_module.unit_type.list.title'),
        edit: t('accounting_module.unit_type.edit'),
      }}
      creationComponent={<CreateUnitType />}
    />
  );
};

export default ListUnitTypes;
