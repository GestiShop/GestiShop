/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ConfigLanguageInfo,
  ConfigUsers,
  ConfigInputMode,
  ConfigModules,
  ConfigAdvanced,
  ConfigCurrencyInfo,
  ConfigDatabaseInfo,
  ConfigBusinessInfo,
} from './menu-options';

const TabPanel = (props: {
  index: number;
  value: number;
  children: ReactElement;
}): ReactElement => {
  const { index, value, children } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (id: string, index: number) => {
  return {
    id,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const Settings = (): ReactElement => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);

  const SETTINGS_SCREENS: Array<{
    id: string;
    label: string;
    component: ReactElement;
  }> = [
    {
      id: 'language-config--btn',
      label: t('settings.language_config.language'),
      component: <ConfigLanguageInfo />,
    },
    {
      id: 'currency-config--btn',
      label: t('settings.currency_config.currency'),
      component: <ConfigCurrencyInfo />,
    },
    {
      id: 'business-config--btn',
      label: t('settings.business_config.business'),
      component: <ConfigBusinessInfo />,
    },
    {
      id: 'database-config--btn',
      label: t('settings.database_config.database'),
      component: <ConfigDatabaseInfo />,
    },
    {
      id: 'users-config--btn',
      label: t('settings.users_config.users'),
      component: <ConfigUsers />,
    },
    {
      id: 'input-mode-config--btn',
      label: t('settings.input_mode_config.input_mode'),
      component: <ConfigInputMode />,
    },
    {
      id: 'module-config--btn',
      label: t('settings.modules_config.modules'),
      component: <ConfigModules />,
    },
    {
      id: 'advanced-config--btn',
      label: t('settings.advanced_config.advanced'),
      component: <ConfigAdvanced />,
    },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
      >
        {SETTINGS_SCREENS.map((x, index) => (
          <Tab key={x.id} label={x.label} {...a11yProps(x.id, index)} />
        ))}
      </Tabs>

      {SETTINGS_SCREENS.map((x, index) => (
        <TabPanel key={x.id} value={value} index={index}>
          {x.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Settings;
