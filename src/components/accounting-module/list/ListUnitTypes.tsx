import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import GenericListComponent from './GenericListComponent';
import { deleteUnitTypes, fetchUnitTypes } from '../../../db';
import CreateUnitType from '../create/CreateUnitType';
import useIsMounted from '../../../utils/use-is-mounted';
import { UnitType } from '../../../model';

const ListUnitTypes = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<UnitType>>([]);
  const isMounted = useIsMounted();

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.unit_type.structure.reference'),
      flex: 1,
    },
    {
      field: 'unit',
      headerName: t('accounting_module.unit_type.structure.unit'),
      flex: 1,
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchUnitTypes();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteUnitTypes(ids);
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
      id="unit-type-list--container"
      rows={rows}
      columns={columns}
      editCallback={handleEdit}
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
