import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
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
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
  ShoppingBasket as ShoppingBasketIcon,
  AccountBalance as AccountBalanceIcon,
  Timeline as TimelineIcon,
  Store as StoreIcon,
  People as PeopleIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
  Description as DescriptionIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  Receipt as ReceiptIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  Category as CategoryIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Assignment as AssignmentIcon,
  AssignmentOutlined as AssignmentOutlinedIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import ListProducts from './list/ListProducts';
import ListTaxes from './list/ListTaxes';
import ListUnitTypes from './list/ListUnitTypes';
import ListWarehouses from './list/ListWarehouses';
import Calendar from './calendar/Calendar';
import ListCategories from './list/ListCategories';
import FullScreenDialog from '../ui/FullscreenDialog';
import Settings from '../settings-module/Settings';
import ListClients from './list/ListClients';
import ListProviders from './list/ListProviders';
import ListClientBills from './list/ListClientBills';
import DocumentGenerator from './documents/DocumentGenerator';
import ListProviderBills from './list/ListProviderBills';
import ListClientBudgets from './list/ListClientBudgets';
import ListProviderBudgets from './list/ListProviderBudgets';
import ListClientDeliveryNotes from './list/ListClientDeliveryNotes';
import ListProviderDeliveryNotes from './list/ListProviderDeliveryNotes';

const DRAWER_WIDTH = 300;

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

const AccountingModuleDashboard = (): ReactElement => {
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const theme = useTheme();

  const DRAWER_ITEMS: Array<
    Array<{
      text: string;
      icon: ReactElement;
      linkTo: string;
    }>
  > = [
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
    [
      {
        text: t('accounting_module.menu.clients'),
        icon: <PeopleIcon />,
        linkTo: `${url}/clients`,
      },
      {
        text: t('accounting_module.menu.providers'),
        icon: <PeopleOutlineOutlinedIcon />,
        linkTo: `${url}/providers`,
      },
    ],
    [
      {
        text: t('accounting_module.menu.client_bills'),
        icon: <DescriptionIcon />,
        linkTo: `${url}/client_bills`,
      },
      {
        text: t('accounting_module.menu.provider_bills'),
        icon: <DescriptionOutlinedIcon />,
        linkTo: `${url}/provider_bills`,
      },
      {
        text: t('accounting_module.menu.client_budgets'),
        icon: <ReceiptIcon />,
        linkTo: `${url}/client_budgets`,
      },
      {
        text: t('accounting_module.menu.provider_budgets'),
        icon: <ReceiptOutlinedIcon />,
        linkTo: `${url}/provider_budgets`,
      },
      {
        text: t('accounting_module.menu.client_delivery_notes'),
        icon: <AssignmentIcon />,
        linkTo: `${url}/client_delivery_notes`,
      },
      {
        text: t('accounting_module.menu.provider_delivery_notes'),
        icon: <AssignmentOutlinedIcon />,
        linkTo: `${url}/provider_delivery_notes`,
      },
    ],
    [
      {
        text: t('accounting_module.menu.documents'),
        icon: <InsertDriveFileIcon />,
        linkTo: `${url}/document_generator`,
      },
    ],
  ];

  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [indexes, setIndexes] = useState<{ i: number; j: number }>({
    i: 0,
    j: 0,
  });

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const isItemSelected = (i: number, j: number): boolean => {
    return indexes.i === i && indexes.j === j;
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

            <div>
              <IconButton
                color="inherit"
                edge="end"
                component={Link}
                to="/dashboard"
                replace
              >
                <ArrowBackIcon />
              </IconButton>

              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setOpenSettingsDialog(true)}
              >
                <SettingsIcon />
              </IconButton>
            </div>
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
            {DRAWER_ITEMS.map((elementList, i) => {
              let itemList = elementList.map((element, j) => (
                <ListItem
                  selected={isItemSelected(i, j)}
                  button
                  key={element.text}
                  component={Link}
                  to={element.linkTo}
                  replace
                  onClick={() =>
                    setIndexes({
                      i,
                      j,
                    })
                  }
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.text} />
                </ListItem>
              ));

              if (i !== DRAWER_ITEMS.length - 1) {
                itemList = itemList.concat(
                  // eslint-disable-next-line react/no-array-index-key
                  <Divider key={`elementlist-${i}`} />
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
            <Route exact path={`${path}/clients`}>
              <ListClients />
            </Route>
            <Route exact path={`${path}/providers`}>
              <ListProviders />
            </Route>
            <Route exact path={`${path}/client_bills`}>
              <ListClientBills />
            </Route>
            <Route exact path={`${path}/provider_bills`}>
              <ListProviderBills />
            </Route>
            <Route exact path={`${path}/client_budgets`}>
              <ListClientBudgets />
            </Route>
            <Route exact path={`${path}/provider_budgets`}>
              <ListProviderBudgets />
            </Route>
            <Route exact path={`${path}/client_delivery_notes`}>
              <ListClientDeliveryNotes />
            </Route>
            <Route exact path={`${path}/provider_delivery_notes`}>
              <ListProviderDeliveryNotes />
            </Route>
            <Route exact path={`${path}/document_generator`}>
              <DocumentGenerator />
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
