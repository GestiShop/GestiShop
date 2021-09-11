/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#E1E1E1',
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: '#E1E1E1',
    fontWeight: 'bold',
  },
}))(TableCell);

const Header = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography align="left" className="mb-2r bold" paragraph>
          {t('accounting_module.model.347.title')}
        </Typography>
      </Grid>
    </Grid>
  );
};

const EntityTableHeader = ({ title }) => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell colSpan={7}>{title}</StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell>
          {t('accounting_module.model.347.document.nif')}
        </StyledTableCell>
        <StyledTableCell align="right">
          {t('accounting_module.model.347.document.name')}
        </StyledTableCell>
        <StyledTableCell align="right">
          {t('accounting_module.model.347.document.trimester_1', { currency })}
        </StyledTableCell>
        <StyledTableCell align="right">
          {t('accounting_module.model.347.document.trimester_2', { currency })}
        </StyledTableCell>
        <StyledTableCell align="right">
          {t('accounting_module.model.347.document.trimester_3', { currency })}
        </StyledTableCell>
        <StyledTableCell align="right">
          {t('accounting_module.model.347.document.trimester_4', { currency })}
        </StyledTableCell>
        <StyledTableCell align="right">
          {t('accounting_module.model.347.document.total', { currency })}
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

const EntitiesTable = ({ entities, isClient }) => {
  const { t } = useTranslation();
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );

  const translation = isClient
    ? t('accounting_module.model.347.document.clients')
    : t('accounting_module.model.347.document.providers');

  return (
    <TableContainer>
      <Table>
        <EntityTableHeader title={translation} />
        <TableBody>
          {entities.map((entity) => (
            <TableRow key={entity.id}>
              <TableCell>{entity.nif}</TableCell>
              <TableCell>{entity.name}</TableCell>
              <TableCell>
                {parseFloat(entity.trimester1).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(entity.trimester2).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(entity.trimester3).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(entity.trimester4).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(entity.total).toFixed(numberOfDecimals)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { Header, EntitiesTable };
