import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import GenericListComponent from './GenericListComponent';
import { deleteProviders, fetchProviders } from '../../../db';
import CreateProvider from '../create/CreateProvider';
import useIsMounted from '../../../utils/use-is-mounted';
import { Provider } from '../../../model';

const ListProviders = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Provider>>([]);
  const isMounted = useIsMounted();

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.provider.structure.reference'),
      flex: 1,
    },
    {
      field: 'name',
      headerName: t('accounting_module.provider.structure.name'),
      flex: 1,
      valueGetter: (params) => params.row?.contactData?.name ?? '-',
    },
    {
      field: 'email',
      headerName: t('accounting_module.provider.structure.main_email_email'),
      flex: 1,
      valueGetter: (params) => params.row?.contactData?.email?.email ?? '-',
    },
    {
      field: 'phone',
      headerName: t('accounting_module.provider.structure.main_phone_phone'),
      flex: 1,
      valueGetter: (params) => params.row?.contactData?.phone?.phone ?? '-',
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchProviders();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteProviders(ids);
    fetchData();
  };

  useEffect((): void => {
    fetchData();
  }, []);

  const handleEdit = () => {
    fetchData();
  };

  const handleDelete = (ids: Array<Types.ObjectId>): void => {
    deleteData(ids);
  };

  return (
    <GenericListComponent
      id="provider-list--container"
      rows={rows}
      columns={columns}
      editCallback={handleEdit}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.provider.create'),
        title: t('accounting_module.provider.list'),
        edit: t('accounting_module.provider.edit'),
      }}
      creationComponent={<CreateProvider />}
    />
  );
};

export default ListProviders;
