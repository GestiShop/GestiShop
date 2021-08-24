/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
              <TableCell align="right">{row.quantity}</TableCell>
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
              {t('accounting_module.product.document.total', { currency })}
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

export { ProductsTable, SummaryTable };
