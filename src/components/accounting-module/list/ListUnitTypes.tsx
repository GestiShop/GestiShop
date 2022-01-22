import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import GenericListComponent from './GenericListComponent';
import { deleteUnitTypes, fetchUnitTypes } from '../../../db';
import CreateUnitType from '../create/CreateUnitType';
import useIsMounted from '../../../utils/useIsMounted';
import { UnitType } from '../../../model/types';

const ListUnitTypes = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<UnitType>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.unit_type.structure.reference'),
      align: 'left',
    },
    {
      id: 'unit',
      label: t('accounting_module.unit_type.structure.unit'),
      align: 'left',
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchUnitTypes();
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
      isDataLoaded={isDataLoaded}
      rows={rows}
      headers={headers}
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
