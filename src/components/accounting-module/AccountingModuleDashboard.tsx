import React, { ReactElement, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon,
  Event as EventIcon,
  ShoppingBasket as ShoppingBasketIcon,
  AccountBalance as AccountBalanceIcon,
  Timeline as TimelineIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
  Description as DescriptionIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  Receipt as ReceiptIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  Assignment as AssignmentIcon,
  AssignmentOutlined as AssignmentOutlinedIcon,
  InsertDriveFile as InsertDriveFileIcon,
} from '@mui/icons-material';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Settings from '../settings-module/Settings';
import { FullScreenDialog } from '../ui/FullscreenDialog';
import Calendar from './calendar/Calendar';
import ListProducts from './list/ListProducts';
import ListTaxes from './list/ListTaxes';
import ListUnitTypes from './list/ListUnitTypes';
import ListWarehouses from './list/ListWarehouses';
import ListCategories from './list/ListCategories';
import ListClients from './list/ListClients';
import ListProviders from './list/ListProviders';
import ListClientBills from './list/ListClientBills';
import ListProviderBills from './list/ListProviderBills';
import ListClientBudgets from './list/ListClientBudgets';
import ListProviderBudgets from './list/ListProviderBudgets';
import ListClientDeliveryNotes from './list/ListClientDeliveryNotes';
import ListProviderDeliveryNotes from './list/ListProviderDeliveryNotes';
import DocumentGenerator from './documents/DocumentGenerator';

const DRAWER_WIDTH = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const AccountingModuleDashboard = (): ReactElement => {
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();

  const theme = useTheme();

  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [indexes, setIndexes] = useState<{ i: number; j: number }>({
    i: 0,
    j: 0,
  });

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isItemSelected = (i: number, j: number): boolean => {
    return indexes.i === i && indexes.j === j;
  };

  return (
    <>
      <Box sx={{ display: 'flex' }} id="accounting-module-container">
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              {t('accounting_module.accounting_module')}
            </Typography>

            <Box component="div">
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
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {DRAWER_ITEMS.map((elementList, i) => {
              let itemList = elementList.map((element, j) => (
                <ListItemButton
                  selected={isItemSelected(i, j)}
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
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {element.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={element.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            height: '100%',
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <DrawerHeader />
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
        </Box>
      </Box>
      <FullScreenDialog
        open={openSettingsDialog}
        closeCallback={() => setOpenSettingsDialog(false)}
        title={t('settings.title')}
        childComponent={<Settings />}
      />
    </>
  );
};
