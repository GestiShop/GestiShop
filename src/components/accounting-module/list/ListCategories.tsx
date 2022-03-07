import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import GenericListComponent from './GenericListComponent';
import { deleteCategories, fetchCategories } from '../../../db';
import CreateCategory from '../create/CreateCategory';
import useIsMounted from '../../../utils/useIsMounted';
import { Category } from '../../../model';

const ListCategories = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Category>>([]);
  const isMounted = useIsMounted();

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.category.structure.reference'),
      flex: 1,
    },
    {
      field: 'name',
      headerName: t('accounting_module.category.structure.name'),
      flex: 1,
    },
    {
      field: 'parent',
      headerName: t('accounting_module.category.structure.parent'),
      flex: 1,
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchCategories();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteCategories(ids);
    fetchData();
  };

  useEffect((): void => {
    fetchData();
  }, []);

  const handleEdit = (): void => {
    fetchData();
  };

  const handleDelete = (ids: Array<Types.ObjectId>): void => {
    deleteData(ids);
  };

  return (
    <GenericListComponent
      rows={rows}
      columns={columns}
      editCallback={handleEdit}
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
