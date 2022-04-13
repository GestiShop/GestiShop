import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { deleteProducts, fetchFullProducts } from '../../../db';
import CreateProduct from '../create/CreateProduct';
import { GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../../utils/redux';
import { Types } from 'mongoose';
import { FullProduct } from '../../../model';

const ListProducts = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<FullProduct>>([]);
  const [currency] = useState(
    useAppSelector((store) => store.configuration.currencyInfo.currencyCode)
  );

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.product.structure.reference'),
      flex: 1,
    },
    {
      field: 'name',
      headerName: t('accounting_module.product.structure.name'),
      flex: 1,
    },
    {
      field: 'basePrice',
      headerName: t('accounting_module.product.structure.base_price', {
        currency,
      }),
      flex: 1,
      valueGetter: (params) => params.row?.sellingInfo?.basePrice ?? '-',
    },
    {
      field: 'stock',
      headerName: t('accounting_module.product.structure.stock'),
      flex: 1,
    },
    {
      field: 'minStock',
      headerName: t('accounting_module.product.structure.min_stock'),
      flex: 1,
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchFullProducts();
    if (response.error !== null) {
      console.log(response.error);
    } else {
      if (response.result !== null) {
        setRows(response.result);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteProducts(ids);
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
      id="product-list--container"
      rows={rows}
      columns={columns}
      editCallback={handleEdit}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.product.create'),
        title: t('accounting_module.product.list'),
        edit: t('accounting_module.product.edit'),
      }}
      creationComponent={<CreateProduct />}
    />
  );
};

export default ListProducts;
