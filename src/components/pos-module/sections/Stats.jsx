import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  TextField
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ImageIcon from '@material-ui/icons/Image';
import EuroIcon from '@material-ui/icons/Euro';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Divider from '@material-ui/core/Divider';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  PieSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const CloseCash = () => {
  const items = [
    {
      name: '05/09/2021',
      total: 14.0,
    },
    {
      name: '06/09/2021',
      total: 90.56,
    },
    {
      name: '07/09/2021',
      total: 1358.99,
    },
  ];

  const items2 = [
    {
      name: 'Efectiu',
      total: 10,
    },
    {
      name: 'Tarjeta',
      total: 15,
    },
    {
      name: 'Altres',
      total: 2,
    },
  ];

  return (
    <Box m={2}>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                id="date"
                label="Data inici"
                type="date"
                defaultValue="2021-09-06"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="date"
                label="Data fi"
                type="date"
                defaultValue="2021-09-07"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => {window.print()}}>
            Imprimir
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Paper mt={2}>
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <List
                component="nav"
                aria-label="secondary mailbox folders"
                subheader={
                  <ListSubheader>Tancaments diaris</ListSubheader>
                }
                fullWidth
              >
                {items.map((item) => {
                  return (
                    <ListItem button key={item.name}>
                      <ListItemAvatar>
                        <Avatar>
                          <ReceiptIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`${item.total.toFixed(2)} €`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item sm={7}>
              <Chart
                data={items}
              >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries argumentField="name" valueField="total" />
              </Chart>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <List
                component="nav"
                aria-label="secondary mailbox folders"
                subheader={
                  <ListSubheader>Mètodes de pagament</ListSubheader>
                }
                fullWidth
              >
                {items2.map((item) => {
                  return (
                    <ListItem button key={item.name}>
                      <ListItemAvatar>
                        <Avatar>
                          <EuroIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.total}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item sm={7}>
              <Chart
                data={items2}
              >
                <PieSeries
                  valueField="total"
                  argumentField="name"
                />
                <Legend />
                <Animation />
              </Chart>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default CloseCash;
