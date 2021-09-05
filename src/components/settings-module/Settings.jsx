/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ConfigLanguage from './ConfigLanguage';
import ConfigCurrencyInfo from './ConfigCurrencyInfo';
import ConfigBusinessInfo from './ConfigBusinessInfo';
import ConfigDbInfo from './ConfigDbInfo';
import ConfigUsers from './ConfigUsers';
import ConfigInputMode from './ConfigInputMode';
import ConfigModules from './ConfigModules';
import ConfigAdvanced from './ConfigAdvanced';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  container: {
    margin: '2%',
    width: '100%',
    height: '100%',
  },
}));

const Settings = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const SETTINGS_SCREENS = [
    {
      label: t('settings.language_config.language'),
      component: ConfigLanguage,
    },
    {
      label: t('settings.currency_config.currency'),
      component: ConfigCurrencyInfo,
    },
    {
      label: t('settings.business_config.business'),
      component: ConfigBusinessInfo,
    },
    /*
    {
      label: t('settings.database_config.database'),
      component: ConfigDbInfo,
    },
    {
      label: t('settings.users_config.users'),
      component: ConfigUsers,
    },
    {
      label: t('settings.input_mode_config.input_mode'),
      component: ConfigInputMode,
    },
    {
      label: t('settings.modules_config.modules'),
      component: ConfigModules,
    },
    {
      label: t('settings.advanced_config.advanced'),
      component: ConfigAdvanced,
    },
    */
  ];

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        className={classes.tabs}
      >
        {SETTINGS_SCREENS.map((x, index) => (
          <Tab key={index} label={x.label} {...a11yProps(index)} />
        ))}
      </Tabs>

      {SETTINGS_SCREENS.map((x, index) => (
        <TabPanel
          className={classes.container}
          key={index}
          value={value}
          index={index}
        >
          {x.component}
        </TabPanel>
      ))}
    </div>
  );
};

export default Settings;
