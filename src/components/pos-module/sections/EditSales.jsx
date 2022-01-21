import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Table from '../../ui/Table';
import FullScreenDialog from '../../ui/FullscreenDialog';
import CreateCalendarEvent from '../../accounting-module/create/CreateCalendarEvent';

const EditSales = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const headers = [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'date',
      label: 'Data',
    },
    {
      id: 'hour',
      label: 'Hora',
    },
    {
      id: 'products',
      label: 'Productes',
    },
    {
      id: 'total',
      label: 'Total',
    },
  ];

  const rows = [
    {
      id: '657463829',
      date: '07/09/2021',
      hour: '12:29',
      products: 2,
      total: '23,41',
    },
    {
      id: '746352856',
      date: '07/09/2021',
      hour: '11:58',
      products: 4,
      total: '50,27',
    },
    {
      id: '153846253',
      date: '07/09/2021',
      hour: '11:14',
      products: 1,
      total: '12,99',
    },
    {
      id: '984637285',
      date: '07/09/2021',
      hour: '10:45',
      products: 1,
      total: '10,56',
    },
  ];

  const customButtonView = (
    <Tooltip title="Buscar">
      <IconButton aria-label="Buscar">
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  const editCallback = (event, i) => {
    setOpenEditDialog(true);
  };

  const headers2 = [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'name',
      label: 'Nom',
    },
    {
      id: 'count',
      label: 'Quantitat',
    },
    {
      id: 'total',
      label: 'Total',
    },
  ];

  const rows2 = [
    {
      id: '657463829',
      name: 'Jaqueta Quicksilver',
      count: 2,
      total: '23,41',
    },
    {
      id: '746352856',
      name: 'Bossa de ma',
      count: 4,
      total: '50,27',
    },
    {
      id: '153846253',
      name: 'Dessuadora',
      count: 1,
      total: '12,99',
    },
    {
      id: '984637285',
      name: 'Guants',
      count: 1,
      total: '10,56',
    },
  ];

  const ticketEditComponent = (
    <Box m={2}>
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
                  disabled
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Data creació"
                  variant="outlined"
                  defaultValue="08/09/2021"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Hora creació"
                  variant="outlined"
                  defaultValue="11:34"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Table
          isDataLoaded
          headers={headers2}
          rows={rows2}
          title="Productes afegits"
          customButtonView={
            <Tooltip title="Afegir">
              <IconButton aria-label="Afegir">
                <AddIcon />
              </IconButton>
            </Tooltip>
          }
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
    </Box>
  );

  return (
    <>
      <Box m={2}>
        <Table
          isDataLoaded
          headers={headers}
          rows={rows}
          title="Editar ventes"
          editCallback={editCallback}
          customButtonView={customButtonView}
        />
      </Box>
      <FullScreenDialog
        open={openEditDialog}
        closeCallback={handleCloseEditDialog}
        title="Editar tiquet 123456789"
        childComponent={ticketEditComponent}
        initialState={{}}
      />
    </>
  );
};

export default EditSales;
