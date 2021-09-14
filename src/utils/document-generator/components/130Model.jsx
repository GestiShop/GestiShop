/* eslint-disable react/no-array-index-key */
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
          {t('accounting_module.model.130.title')}
        </Typography>
      </Grid>
    </Grid>
  );
};

const MoneySummaryTableHeader = ({ title }) => {
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
        <StyledTableCell align="right">
          {t('accounting_module.model.130.document.description')}
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

const MoneySummaryTable = ({ moneySummary }) => {
  const { t } = useTranslation();
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );

  const typesTranslations = [
    t('accounting_module.model.130.document.income'),
    t('accounting_module.model.130.document.expenses'),
    t('accounting_module.model.130.document.benefits'),
  ];

  return (
    <TableContainer>
      <Table>
        <MoneySummaryTableHeader
          title={t('accounting_module.model.130.document.summary')}
        />
        <TableBody>
          {moneySummary.map((summary, i) => (
            <TableRow key={i}>
              <TableCell>{typesTranslations[i]}</TableCell>
              <TableCell>
                {parseFloat(summary.trimester1).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(summary.trimester2).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(summary.trimester3).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(summary.trimester4).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell>
                {parseFloat(summary.total).toFixed(numberOfDecimals)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { Header, MoneySummaryTable };
