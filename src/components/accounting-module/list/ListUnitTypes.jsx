import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { deleteUnitTypes, fetchUnitTypes } from '../../../db/UnitTypeHelper';
import CreateUnitType from '../create/CreateUnitType';
import useIsMounted from '../../../utils/useIsMounted';

const ListUnitTypes = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.unit_type.structure.reference'),
      align: 'left',
    },
    {
      id: 'unit',
      label: t('accounting_module.unit_type.structure.unit'),
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

  const deleteData = (ids) => {
    deleteUnitTypes(
      ids,
      (error) => {
        console.log('error', error);
      },
      () => {
        fetchData();
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

  const handleDelete = (ids) => {
    console.log('Delete rows:', ids);
    deleteData(ids);
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
        title: t('accounting_module.unit_type.list'),
        edit: t('accounting_module.unit_type.edit'),
      }}
      creationComponent={<CreateUnitType />}
    />
  );
};

export default ListUnitTypes;
