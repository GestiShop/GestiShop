import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GenericListComponent from './GenericListComponent';
import { deleteProducts, fetchProducts } from '../../../db/ProductHelper';
import CreateProduct from '../create/CreateProduct';
import useIsMounted from '../../../utils/useIsMounted';

const ListProducts = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();
  const currency = useSelector(
    (store) => store.configuration.currencyInfo.currency.label
  );

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.product.structure.reference'),
      align: 'left',
    },
    {
      id: 'name',
      label: t('accounting_module.product.structure.name'),
      align: 'left',
    },
    {
      id: 'basePrice',
      label: t('accounting_module.product.structure.base_price', { currency }),
      align: 'right',
    },
    {
      id: 'stock',
      label: t('accounting_module.product.structure.stock'),
      align: 'right',
    },
    {
      id: 'minStock',
      label: t('accounting_module.product.structure.min_stock'),
      align: 'right',
    },
    {
      id: 'visible',
      label: t('accounting_module.product.structure.visible'),
      align: 'right',
    },
  ];

  const fetchData = () => {
    fetchProducts(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
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
        title: t('accounting_module.product.list'),
        edit: t('accounting_module.product.edit'),
      }}
      creationComponent={<CreateProduct />}
    />
  );
};

export default ListProducts;
