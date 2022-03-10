import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { Types } from 'mongoose';
import GenericListComponent from './GenericListComponent';
import { deleteClients, fetchClients } from '../../../db';
import CreateClient from '../create/CreateClient';
import useIsMounted from '../../../utils/useIsMounted';
import { Client } from '../../../model';

const ListClients = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Client>>([]);
  const isMounted = useIsMounted();

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.client.structure.reference'),
      flex: 1,
    },
    {
      field: 'name',
      headerName: t('accounting_module.client.structure.name'),
      flex: 1,
      valueGetter: (params) => {
        return params.row?.contactData?.name ?? '-';
      },
    },
    {
      field: 'email',
      headerName: t('accounting_module.client.structure.main_email_email'),
      flex: 1,
      valueGetter: (params) => {
        return params.row?.contactData?.email?.email ?? '-';
      },
    },
    {
      field: 'phone',
      headerName: t('accounting_module.client.structure.main_phone_phone'),
      flex: 1,
      valueGetter: (params) => {
        return params.row?.contactData?.phone?.phone ?? '-';
      },
    },
  ];

  const fetchData = async () => {
    const response = await fetchClients();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteClients(ids);
    fetchData();
  };

  useEffect(() => {
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
      id="client-list--container"
      rows={rows}
      columns={columns}
      editCallback={handleEdit}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.client.create'),
        title: t('accounting_module.client.list'),
        edit: t('accounting_module.client.edit'),
      }}
      creationComponent={<CreateClient />}
    />
  );
};

export default ListClients;
