import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { deleteProducts, fetchProducts } from '../../../db/ProductHelper';
import CreateProduct from '../create/CreateProduct';
import useIsMounted from '../../../utils/useIsMounted';

const INIT_ROWS = [
  {
    _id: 'ID0',
    reference: 'PROD000',
    name: 'Product 000',
    basePrice: 26.98,
    stock: 10,
    unitType: 'kg',
    discountPercentage: 0.0,
    taxPercentage: 21.0,
    minStock: 12,
    stockAlert: true,
    visible: true,
  },
  {
    _id: 'ID1',
    reference: 'PROD001',
    name: 'Product 001',
    basePrice: 22.98,
    stock: 18,
    unitType: 'units',
    discountPercentage: 0.0,
    taxPercentage: 21.0,
    minStock: 50,
    stockAlert: false,
    visible: true,
  },
];

const ListProducts = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState(INIT_ROWS);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.product.list.headers.reference'),
      align: 'left',
    },
    {
      id: 'name',
      label: t('accounting_module.product.list.headers.name'),
      align: 'left',
    },
    {
      id: 'basePrice',
      label: t('accounting_module.product.list.headers.price'),
      align: 'right',
    },
    {
      id: 'stock',
      label: t('accounting_module.product.list.headers.stock'),
      align: 'right',
    },
    {
      id: 'visible',
      label: t('accounting_module.product.list.headers.state'),
      align: 'left',
    },
  ];

  const fetchData = () => {
    fetchProducts(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        // if (isMounted.current) setRows(data);
      }
    );
  };

  const deleteData = (ids) => {
    deleteProducts(
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
        create: t('accounting_module.product.create'),
        title: t('accounting_module.product.list.title'),
        edit: t('accounting_module.product.edit'),
      }}
      creationComponent={<CreateProduct />}
    />
  );
};

export default ListProducts;
