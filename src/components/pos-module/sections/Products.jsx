import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Table from '../../ui/Table';
import { fetchProducts } from '../../../db/ProductHelper';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const headers = [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'name',
      label: 'Nom',
    },
    {
      id: 'stock',
      label: 'Stock',
    },
    {
      id: 'price',
      label: 'Preu/u',
    },
  ];

  const rows = [
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Samarreta Pull & Bear',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Pantalons G-Star',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Dessuadora SuperDry',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Samarreta Berska',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Polo Mango',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Xandall Inside',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Xancletes Nike',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
    {
      id: Math.floor(Math.random() * 1000000000),
      name: 'Espardenyes',
      stock: Math.floor(Math.random() * 100),
      price: `${(Math.random() * 100).toFixed(2)} €`,
    },
  ];

  const customButtonView = (
    <>
      <Tooltip title="Buscar">
        <IconButton
          aria-label="Buscar"
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Afegir">
        <IconButton
          aria-label="Afegir"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const editCallback = (event, i) => {

  };

  useEffect(() => {
    fetchProducts((err) => {}, (products) => {

    })
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box fontSize={18}>Total productes: 3547</Box>
      </Grid>
      <Grid item>
        <Box fontSize={18}>Total en stock: 2646</Box>
      </Grid>
      <Grid item sm={12}>
        <Table
          isDataLoaded
          headers={headers}
          rows={rows}
          title="Productes"
          editCallback={editCallback}
          customButtonView={customButtonView}
        />
      </Grid>
    </Grid>
  )
};

export default Products;
