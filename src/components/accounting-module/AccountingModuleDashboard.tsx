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
import { Link, Navigate, Route, Routes } from 'react-router-dom';
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
  const pathname = 'accounting_module';

  const theme = useTheme();

  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [indexes, setIndexes] = useState<{ i: number; j: number }>({
    i: 0,
    j: 0,
  });

  const DRAWER_ITEMS: Array<
    Array<{
      id: string;
      text: string;
      icon: ReactElement;
      linkTo: string;
    }>
  > = [
    [
      {
        id: 'calendar--link',
        text: t('accounting_module.menu.schedule'),
        icon: <EventIcon />,
        linkTo: `${pathname}/calendar`,
      },
    ],
    [
      {
        id: 'products--link',
        text: t('accounting_module.menu.products'),
        icon: <ShoppingBasketIcon />,
        linkTo: `${pathname}/products`,
      },
      {
        id: 'taxes--link',
        text: t('accounting_module.menu.taxes'),
        icon: <AccountBalanceIcon />,
        linkTo: `${pathname}/taxes`,
      },
      {
        id: 'unit-types--link',
        text: t('accounting_module.menu.unit_types'),
        icon: <TimelineIcon />,
        linkTo: `${pathname}/unit_types`,
      },
      {
        id: 'warehouses--link',
        text: t('accounting_module.menu.warehouses'),
        icon: <StoreIcon />,
        linkTo: `${pathname}/warehouses`,
      },
      {
        id: 'categories--link',
        text: t('accounting_module.menu.categories'),
        icon: <CategoryIcon />,
        linkTo: `${pathname}/categories`,
      },
    ],
    [
      {
        id: 'clients--link',
        text: t('accounting_module.menu.clients'),
        icon: <PeopleIcon />,
        linkTo: `${pathname}/clients`,
      },
      {
        id: 'providers--link',
        text: t('accounting_module.menu.providers'),
        icon: <PeopleOutlineOutlinedIcon />,
        linkTo: `${pathname}/providers`,
      },
    ],
    [
      {
        id: 'client-bills--link',
        text: t('accounting_module.menu.client_bills'),
        icon: <DescriptionIcon />,
        linkTo: `${pathname}/client_bills`,
      },
      {
        id: 'provider-bills--link',
        text: t('accounting_module.menu.provider_bills'),
        icon: <DescriptionOutlinedIcon />,
        linkTo: `${pathname}/provider_bills`,
      },
      {
        id: 'client-budgets--link',
        text: t('accounting_module.menu.client_budgets'),
        icon: <ReceiptIcon />,
        linkTo: `${pathname}/client_budgets`,
      },
      {
        id: 'provider-budgets--link',
        text: t('accounting_module.menu.provider_budgets'),
        icon: <ReceiptOutlinedIcon />,
        linkTo: `${pathname}/provider_budgets`,
      },
      {
        id: 'client-delivery-notes--link',
        text: t('accounting_module.menu.client_delivery_notes'),
        icon: <AssignmentIcon />,
        linkTo: `${pathname}/client_delivery_notes`,
      },
      {
        id: 'provider-delivery-notes--link',
        text: t('accounting_module.menu.provider_delivery_notes'),
        icon: <AssignmentOutlinedIcon />,
        linkTo: `${pathname}/provider_delivery_notes`,
      },
    ],
    [
      {
        id: 'documents--link',
        text: t('accounting_module.menu.documents'),
        icon: <InsertDriveFileIcon />,
        linkTo: `${pathname}/document_generator`,
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
      <Box sx={{ display: 'flex' }} id="accounting-module--container">
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
                  id={element.id}
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
          <Routes>
            <Route //
              path={`${pathname}/calendar`}
              element={<Calendar />}
            />
            <Route //
              path={`${pathname}/products`}
              element={<ListProducts />}
            />
            <Route //
              path={`${pathname}/taxes`}
              element={<ListTaxes />}
            />
            <Route
              path={`${pathname}/unit_types`}
              element={<ListUnitTypes />}
            />
            <Route
              path={`${pathname}/warehouses`}
              element={<ListWarehouses />}
            />
            <Route
              path={`${pathname}/categories`}
              element={<ListCategories />}
            />
            <Route //
              path={`${pathname}/clients`}
              element={<ListClients />}
            />
            <Route //
              path={`${pathname}/providers`}
              element={<ListProviders />}
            />
            <Route
              path={`${pathname}/client_bills`}
              element={<ListClientBills />}
            />
            <Route
              path={`${pathname}/provider_bills`}
              element={<ListProviderBills />}
            />
            <Route
              path={`${pathname}/client_budgets`}
              element={<ListClientBudgets />}
            />
            <Route
              path={`${pathname}/provider_budgets`}
              element={<ListProviderBudgets />}
            />
            <Route
              path={`${pathname}/client_delivery_notes`}
              element={<ListClientDeliveryNotes />}
            />
            <Route
              path={`${pathname}/provider_delivery_notes`}
              element={<ListProviderDeliveryNotes />}
            />
            <Route
              path={`${pathname}/document_generator`}
              element={<DocumentGenerator />}
            />
            <Route
              path={'*'}
              element={<Navigate to={`${pathname}/calendar`} replace />}
            />
          </Routes>
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
