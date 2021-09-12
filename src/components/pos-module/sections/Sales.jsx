import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  Tooltip,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'react-i18next';
import Table from '../../ui/Table';
import { fetchProducts } from '../../../db/ProductHelper';

const Sales = () => {
  const { t } = useTranslation();

  const [openDialog, setOpenDialog] = useState(false);
  const [operari, setOperari] = useState('Iscle');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [change, setChange] = useState(0.0);

  useEffect(() => {
    // TODO: Fetch next ticket ID

    // TODO: Fetch available users

    // Fetch all products from the database
    fetchProducts(
      (err) => {},
      (data) => {
        setProducts(data);
        setProductsLoaded(true);
      }
    );
  }, []);

  useEffect(() => {
    let totalCount = 0.0;
    selectedProducts.forEach((selectedProduct) => {
      totalCount +=
        selectedProduct.product.sellingInfo.basePrice * selectedProduct.count;
    });
    setTotal(totalCount);
  }, [selectedProducts]);

  useEffect(() => setChange(0.0), [paymentMethod]);

  const handleOperariChange = (event) => {
    setOperari(event.target.value);
  };

  const handleDialogClose = () => {
    // TODO: Save to db

    // TODO: Update ticket id

    setSelectedProducts([]);
    setOpenDialog(false);
  };

  const handleSelectProduct = (event, id) => {
    event.stopPropagation();

    const newSelectedProducts = selectedProducts.slice();
    const index = newSelectedProducts.findIndex((x) => x.id === id);
    if (index === -1) {
      newSelectedProducts.push({
        id,
        product: products.find((x) => x.id === id),
        count: 1,
      });
    } else {
      newSelectedProducts[index].count += 1;
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleRemoveProduct = (event, id) => {
    event.stopPropagation();

    const newSelectedProducts = selectedProducts.slice();
    const index = newSelectedProducts.findIndex((x) => x.product.id === id);
    if (newSelectedProducts[index].count > 1) {
      newSelectedProducts[index].count -= 1;
    } else {
      newSelectedProducts.splice(index, 1);
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleFinishTicket = () => {
    setChange(0.0);
    setOpenDialog(true);
  };

  const productHeaders = [
    {
      id: 'reference',
      label: 'Referència',
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
      id: 'sellingInfo.basePrice',
      label: 'Preu (€)',
      numeric: true,
    },
  ];

  const selectedProductHeaders = [
    {
      id: 'product.reference',
      label: 'Referència',
    },
    {
      id: 'product.name',
      label: 'Nom',
    },
    {
      id: 'count',
      label: 'Quantitat',
    },
    {
      id: 'price',
      label: 'Preu total (€)',
      value: (row) => row.product.sellingInfo.basePrice * row.count,
      numeric: true,
    },
  ];

  const availableProductsButtonView = (
    <Tooltip title="Cerca">
      <IconButton aria-label="Cerca">
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  const addedProductsButtonView = (
    <Tooltip title="Finalitzar ticket">
      <IconButton aria-label="Finalitzar ticket" onClick={handleFinishTicket}>
        <DoneIcon />
      </IconButton>
    </Tooltip>
  );

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
              isDataLoaded={productsLoaded}
              headers={productHeaders}
              rows={products}
              title="Productes disponibles"
              customButtonView={availableProductsButtonView}
              customActions={[
                {
                  title: 'Afegir unitat',
                  handleClick: handleSelectProduct,
                  icon: <AddIcon />,
                },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <Table
              isDataLoaded
              headers={selectedProductHeaders}
              rows={selectedProducts}
              title="Productes afegits"
              customButtonView={addedProductsButtonView}
              customActions={[
                {
                  title: 'Afegir unitat',
                  handleClick: handleSelectProduct,
                  icon: <AddIcon />,
                },
                {
                  title: 'Eliminar unitat',
                  handleClick: handleRemoveProduct,
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
        <DialogTitle id="alert-dialog-title">Finalitzar ticket</DialogTitle>
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
                      type="number"
                      onChange={(event) => {
                        const value = parseFloat(event.target.value);
                        if (value - total > 0) {
                          setChange(value - total);
                        } else {
                          setChange(0.0);
                        }
                      }}
                    />
                    <Box>Canvi: {change.toFixed(2)} €</Box>
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
