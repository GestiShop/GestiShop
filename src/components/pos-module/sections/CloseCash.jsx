import React from 'react';
import {
  Avatar,
  Box, Button,
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

  return (
    <Box m={2}>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                id="date"
                label="Data tancament"
                type="date"
                defaultValue="2021-09-07"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="date"
                label="Data ultim tancament"
                type="date"
                defaultValue="2021-09-07"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Tancar caixa
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Paper mt={2}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item sm={4}>
              <List
                component="nav"
                aria-label="secondary mailbox folders"
                subheader={
                  <ListSubheader>Tancaments diaris anteriors</ListSubheader>
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
            <Grid item sm={4}>
              <List
                component="nav"
                aria-label="secondary mailbox folders"
                subheader={
                  <ListSubheader>Mètodes de pagament tancament actual</ListSubheader>
                }
                fullWidth
              >
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <EuroIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Pagaments en efectiu"
                    secondary="56.75 €"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <CreditCardIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Pagaments amb tarjeta"
                    secondary="87.35 €"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <ReceiptIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Total pagaments"
                    secondary="144.10 €"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default CloseCash;
