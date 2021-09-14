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
import moment from 'moment';

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

const BillHeader = ({ billNumberPreamble, billNumber, date, clientData }) => {
  const { t } = useTranslation();
  const billNumberToPrint = billNumberPreamble
    ? `${billNumberPreamble}-${billNumber}`
    : billNumber;

  const [businessInfo, setBusinessInfo] = useState(
    useSelector((store) => store.configuration.businessInfo)
  );

  const getAddressToPrint = (address) => {
    let res = `${address.roadType}. ${address.street}, ${address.number}`;

    if (address.floor) {
      res += ` Nº ${businessInfo.address.floor}`;
      if (address.door) {
        res += `, ${businessInfo.address.door}`;
      }
    }

    return res;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography align="left" className="mb-2r bold" paragraph>
          {`${t(
            'accounting_module.bill.structure.bill_number'
          )}: ${billNumberToPrint}`}
        </Typography>
        <Typography align="left" paragraph>
          {businessInfo.name}
        </Typography>
        <Typography align="left" paragraph>
          {businessInfo.nif}
        </Typography>
        <Typography align="left" paragraph>
          {getAddressToPrint(businessInfo.address)}
        </Typography>
        <Typography align="left" paragraph>
          {`${businessInfo.address.zipCode} ${businessInfo.address.city}`}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" className="mb-2r bold" paragraph>
          {`${t('accounting_module.bill.structure.date')}: ${moment(
            date
          ).format('DD/MM/YYYY')}`}
        </Typography>
        <Typography align="right" paragraph>
          {clientData.name}
        </Typography>
        <Typography align="right" paragraph>
          {clientData.nif}
        </Typography>
        <Typography align="right" paragraph>
          {getAddressToPrint(clientData.address)}
        </Typography>
        <Typography align="right" paragraph>
          {`${clientData.address.zipCode} ${clientData.address.city}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ProductsTable = ({ products }) => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {t('accounting_module.product.document.description')}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.quantity')}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.price_per_unit', {
                currency,
              })}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.discount')}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.subtotal', { currency })}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.vat')}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{`${row.quantity} ${row.unitType}`}</TableCell>
              <TableCell align="right">
                {row.basePricePerUnit.toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell align="right">{row.discountPercentage}</TableCell>
              <TableCell align="right">
                {(
                  row.quantity *
                  row.basePricePerUnit *
                  (1 - row.discountPercentage / 100)
                ).toFixed(numberOfDecimals)}
              </TableCell>
              <TableCell align="right">{row.taxPercentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SummaryTable = ({ products }) => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );
  const [numberOfDecimals, setNumberOfDecimals] = useState(
    useSelector((store) => store.configuration.currencyInfo.floatingPositions)
  );

  const vatPercentages = products.reduce((acc, product) => {
    const productSubtotal =
      product.basePricePerUnit *
      product.quantity *
      (1 - product.discountPercentage / 100);

    (acc[product.taxPercentage] = acc[product.taxPercentage] || []).push(
      productSubtotal
    );
    return acc;
  }, {});

  const billTotal = products
    .map(
      (product) =>
        product.basePricePerUnit *
        product.quantity *
        (1 - product.discountPercentage / 100) *
        (1 + product.taxPercentage / 100)
    )
    .reduce((acc, product) => acc + product);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {t('accounting_module.product.document.subtotal', { currency })}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.vat')}
            </StyledTableCell>
            <StyledTableCell align="right">
              {t('accounting_module.product.document.vat_fee', { currency })}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(vatPercentages).map((i) => {
            const vatSubtotal = vatPercentages[i].reduce(
              (acc, product) => acc + product
            );
            return (
              <TableRow key={i}>
                <TableCell>{vatSubtotal.toFixed(numberOfDecimals)}</TableCell>
                <TableCell align="right">{i}</TableCell>
                <TableCell align="right">
                  {(vatSubtotal * (i / 100)).toFixed(numberOfDecimals)}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <StyledTableCell>
              {t('accounting_module.product.document.total_bill', { currency })}
            </StyledTableCell>
            <StyledTableCell align="right" colSpan={2}>
              {billTotal.toFixed(numberOfDecimals)}
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { BillHeader, ProductsTable, SummaryTable };
