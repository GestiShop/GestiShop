import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import GenericListComponent from './GenericListComponent';
import { deleteCategories, fetchCategories } from '../../../db';
import CreateCategory from '../create/CreateCategory';
import useIsMounted from '../../../utils/useIsMounted';
import { Category } from '../../../model/types';

const ListCategories = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Category>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
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

  const fetchData = async (): Promise<void> => {
    const response = await fetchCategories();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
        setIsDataLoaded(true);
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
      isDataLoaded={isDataLoaded}
      rows={rows}
      headers={headers}
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
