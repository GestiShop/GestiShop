/* eslint-disable react/no-array-index-key */
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

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const Settings = (): ReactElement => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);

  const SETTINGS_SCREENS: Array<{
    label: string;
    component: ReactElement;
  }> = [
    {
      label: t('settings.language_config.language'),
      component: <ConfigLanguageInfo />,
    },
    {
      label: t('settings.currency_config.currency'),
      component: <ConfigCurrencyInfo />,
    },
    {
      label: t('settings.business_config.business'),
      component: <ConfigBusinessInfo />,
    },
    {
      label: t('settings.database_config.database'),
      component: <ConfigDatabaseInfo />,
    },
    {
      label: t('settings.users_config.users'),
      component: <ConfigUsers />,
    },
    {
      label: t('settings.input_mode_config.input_mode'),
      component: <ConfigInputMode />,
    },
    {
      label: t('settings.modules_config.modules'),
      component: <ConfigModules />,
    },
    {
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
          <Tab key={index} label={x.label} {...a11yProps(index)} />
        ))}
      </Tabs>

      {SETTINGS_SCREENS.map((x, index) => (
        <TabPanel key={index} value={value} index={index}>
          {x.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Settings;
