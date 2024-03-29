import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import GenericListComponent from './GenericListComponent';
import { deleteCategories, fetchCategories } from '../../../db';
import CreateCategory from '../create/CreateCategory';
import { Category } from '../../../model';

const ListCategories = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Category>>([]);

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
      valueGetter: (params) =>
        params.row?.parent !== undefined
          ? `[${params.row?.parent?.reference}] ${params.row?.parent?.name}`
          : '-',
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchCategories();
    if (response.error !== null) {
      console.error(response.error);
    } else {
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
      id="category-list--container"
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
