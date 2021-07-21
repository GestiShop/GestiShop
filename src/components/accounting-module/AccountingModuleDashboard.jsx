/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EventIcon from '@material-ui/icons/Event';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TimelineIcon from '@material-ui/icons/Timeline';
import StoreIcon from '@material-ui/icons/Store';
import CategoryIcon from '@material-ui/icons/Category';
import ListProducts from './list/ListProducts';
import ListTaxes from './list/ListTaxes';
import ListUnitTypes from './list/ListUnitTypes';
import ListWarehouses from './list/ListWarehouses';
import Calendar from './calendar/Calendar';
import ListCategories from './list/ListCategories';
import FullScreenDialog from '../ui/FullscreenDialog';
import Settings from '../settings-module/Settings';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    '& .rbc-calendar': {
      overflow: 'auto',
    },
  },
  navbar: {
    justifyContent: 'space-between',
  },
}));

const AccountingModuleDashboard = () => {
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();

  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  const DRAWER_ITEMS = [
    [
      {
        text: t('accounting_module.menu.schedule'),
        icon: <EventIcon />,
        linkTo: `${url}/calendar`,
      },
    ],
    [
      {
        text: t('accounting_module.menu.products'),
        icon: <ShoppingBasketIcon />,
        linkTo: `${url}/products`,
      },
      {
        text: t('accounting_module.menu.taxes'),
        icon: <AccountBalanceIcon />,
        linkTo: `${url}/taxes`,
      },
      {
        text: t('accounting_module.menu.unit_types'),
        icon: <TimelineIcon />,
        linkTo: `${url}/unit_types`,
      },
      {
        text: t('accounting_module.menu.warehouses'),
        icon: <StoreIcon />,
        linkTo: `${url}/warehouses`,
      },
      {
        text: t('accounting_module.menu.categories'),
        icon: <CategoryIcon />,
        linkTo: `${url}/categories`,
      },
    ],
  ];

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.navbar}>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              {t('accounting_module.accounting_module')}
            </Typography>

            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setOpenSettingsDialog(true)}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {DRAWER_ITEMS.map((elementList, index) => {
              let itemList = elementList.map((element) => (
                <ListItem
                  button
                  key={element.text}
                  component={Link}
                  to={element.linkTo}
                  replace
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.text} />
                </ListItem>
              ));

              if (index !== DRAWER_ITEMS.length - 1) {
                itemList = itemList.concat(
                  <Divider key={`elementlist-${index}`} />
                );
              }

              return itemList;
            })}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path={`${path}/calendar`}>
              <Calendar />
            </Route>
            <Route exact path={`${path}/products`}>
              <ListProducts />
            </Route>
            <Route exact path={`${path}/taxes`}>
              <ListTaxes />
            </Route>
            <Route exact path={`${path}/unit_types`}>
              <ListUnitTypes />
            </Route>
            <Route exact path={`${path}/warehouses`}>
              <ListWarehouses />
            </Route>
            <Route exact path={`${path}/categories`}>
              <ListCategories />
            </Route>
            <Route exact path={`${path}`}>
              <Redirect to={`${path}/calendar`} />
            </Route>
          </Switch>
        </main>
      </div>
      <FullScreenDialog
        open={openSettingsDialog}
        closeCallback={() => setOpenSettingsDialog(false)}
        title={t('settings.title')}
        childComponent={<Settings />}
      />
    </>
  );
};

export default AccountingModuleDashboard;
