import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { deleteCategories, fetchCategories } from '../../../db/CategoryHelper';
import CreateCategory from '../create/CreateCategory';
import useIsMounted from '../../../utils/useIsMounted';

const ListCategories = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.category.structure.reference'),
      align: 'left',
    },
    {
      id: 'name',
      label: t('accounting_module.category.structure.name'),
      align: 'left',
    },
    {
      id: 'parent',
      label: t('accounting_module.category.structure.parent'),
      align: 'left',
    },
  ];

  const fetchData = () => {
    fetchCategories(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
      }
    );
  };

  const deleteData = (ids) => {
    deleteCategories(
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
        create: t('accounting_module.category.create'),
        title: t('accounting_module.category.list'),
        edit: t('accounting_module.category.edit'),
      }}
      creationComponent={<CreateCategory />}
    />
  );
};

export default ListCategories;
