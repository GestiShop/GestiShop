/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DrawerLayout from '../ui/DrawerLayout';
import Sales from './sections/Sales';
import EditSales from './sections/EditSales';
import CloseCash from './sections/CloseCash';
import Clients from './sections/Clients';
import Providers from './sections/Providers';
import Products from './sections/Products';
import Stats from './sections/Stats';

const PosModuleDashboard = () => {
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();

  const drawerItems = [
    [
      {
        text: t('pos_module.menu.sales'),
        icon: <AddShoppingCartOutlinedIcon />,
        href: `${url}/sales`,
      },
      {
        text: t('pos_module.menu.edit_sales'),
        icon: <ShoppingCartOutlinedIcon />,
        href: `${url}/edit_sales`,
      },
      {
        text: t('pos_module.menu.close_cash'),
        icon: <AssignmentTurnedInOutlinedIcon />,
        href: `${url}/close_cash`,
      },
    ],
    [
      {
        text: t('pos_module.menu.products'),
        icon: <AssignmentOutlinedIcon />,
        href: `${url}/products`,
      },
    ],
    [
      {
        text: t('pos_module.menu.stats'),
        icon: <AssessmentIcon />,
        href: `${url}/stats`,
      },
    ],
  ];

  const view = (
    <Switch>
      <Route exact path={`${path}/sales`}>
        <Sales />
      </Route>
      <Route exact path={`${path}/edit_sales`}>
        <EditSales />
      </Route>
      <Route exact path={`${path}/close_cash`}>
        <CloseCash />
      </Route>
      <Route exact path={`${path}/clients`}>
        <Clients />
      </Route>
      <Route exact path={`${path}/providers`}>
        <Providers />
      </Route>
      <Route exact path={`${path}/products`}>
        <Products />
      </Route>
      <Route exact path={`${path}/stats`}>
        <Stats />
      </Route>
      <Route exact path={`${path}`}>
        <Redirect to={`${path}/sales`} />
      </Route>
    </Switch>
  );

  return (
    <DrawerLayout
      title={t('pos_module.name')}
      drawerItems={drawerItems}
      view={view}
    />
  );
};

export default PosModuleDashboard;
