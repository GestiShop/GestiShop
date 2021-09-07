import React, { useState } from 'react';
import {
  Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Dialog from '@material-ui/core/Dialog';
import Table from '../../ui/Table';

const Sales = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [operari, setOperari] = useState('Iscle');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleOperariChange = (event) => {
    setOperari(event.target.value);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    // editCallback();
  };

  const headers1 = [
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

  const rows1 = [
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

  const headers2 = [
    headers1[0],
    headers1[1],
    {
      id: 'count',
      label: 'Quantitat',
    },
    {
      id: 'price',
      label: 'Preu total',
    },
  ];

  const rows2 = [
    {
      id: rows1[0].id,
      name: rows1[0].name,
      count: Math.floor(Math.random() * 10),
      price: rows1[0].price,
    },
    {
      id: rows1[2].id,
      name: rows1[2].name,
      count: Math.floor(Math.random() * 10),
      price: rows1[2].price,
    },
    {
      id: rows1[5].id,
      name: rows1[5].name,
      count: Math.floor(Math.random() * 10),
      price: rows1[5].price,
    },
  ];

  let total = 0.0;
  rows2.forEach((row) => {
    const thistotal = (row.price.slice(0, -2) * row.count).toFixed(2);
    row.price = `${thistotal} €`;
    total += parseFloat(thistotal);
  });

  const onFinishTicketClick = () => {
    setOpenDialog(true);
  };

  const createCustomButtonView1 = () => {
    return (
      <Tooltip title="Cerca">
        <IconButton aria-label="Cerca">
          <SearchIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const createCustomButtonView2 = () => {
    return (
      <Tooltip title="Finalitzar ticket">
        <IconButton
          aria-label="Finalitzar ticket"
          onClick={onFinishTicketClick}
        >
          <DoneIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={2}>
            <Grid container justify="space-between" alignItems="center" mb={2}>
              <Grid item sm={2}>
                <TextField
                  id="outlined-basic"
                  label="Nº Ticket"
                  variant="outlined"
                  defaultValue="000000001"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Box fontSize={28}>Total: {total.toFixed(2)}€</Box>
              </Grid>
              <Grid item sm={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Operari
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={operari}
                    onChange={handleOperariChange}
                    label="Operari"
                  >
                    <MenuItem value="">
                      <em>-</em>
                    </MenuItem>
                    <MenuItem value="Iscle">Iscle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Table
              isDataLoaded
              headers={headers1}
              rows={rows1}
              title="Productes disponibles"
              customButtonView={createCustomButtonView1()}
              customActions={[
                {
                  title: 'Afegir unitat',
                  handleClick: () => {},
                  icon: <AddIcon />,
                },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <Table
              isDataLoaded
              headers={headers2}
              rows={rows2}
              title="Productes afegits"
              customButtonView={createCustomButtonView2()}
              customActions={[
                {
                  title: 'Afegir unitat',
                  handleClick: () => {},
                  icon: <AddIcon />,
                },
                {
                  title: 'Eliminar unitat',
                  handleClick: () => {},
                  icon: <RemoveIcon />,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        // TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">{"Finalitzar ticket"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selecciona el mètode de pagament i finalitza el ticket.
          </DialogContentText>
          <Grid container>
            <Grid item sm={6}>
              <RadioGroup
                aria-label="Mètode de pagament"
                name="payment-method"
                value={paymentMethod}
                onChange={(event) => {
                  setPaymentMethod(event.target.value);
                }}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Efectiu"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Tarjeta"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Altres"
                />
              </RadioGroup>
            </Grid>
            <Grid item sm={6}>
              <Box
                flexDirection="column"
                display="flex"
                flex="1 1 auto"
                justifyContent="space-evenly"
                height={1}
              >
                <Box>A pagar: {total.toFixed(2)} €</Box>
                {paymentMethod === 'cash' && (
                  <>
                    <TextField
                      id="outlined-basic"
                      label="Entregat"
                      variant="outlined"
                    />
                    <Box>Canvi: 0.00 €</Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Finalitzar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sales;
