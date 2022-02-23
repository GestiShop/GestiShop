import React, { ReactElement, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  setDefaultDatabaseInfo,
  useAppDispatch,
  useAppSelector,
} from '../../../utils/redux';
import { PlatformDatabaseInfo } from '../../../../assets/config/config';

export const ConfigDbInfo = (): ReactElement => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const defaultDatabaseInfo = useAppSelector(
    (store) => store.configuration.databaseInfo
  );

  const [state, setState] = useState<PlatformDatabaseInfo>(defaultDatabaseInfo);

  const handleChange = (event: {
    target: {
      name: string;
      value: string;
    };
  }): void => {
    const newState = {
      ...state,
      [event.target.name]: event.target.value,
    };

    setState(newState);
    dispatch(setDefaultDatabaseInfo(newState));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <FormControl variant="outlined" className="w-100">
          <InputLabel htmlFor="url">
            {t('settings.database_config.url')}
          </InputLabel>
          <OutlinedInput
            id="url"
            value={state.url}
            placeholder={t('settings.database_config.enter_url')}
            onChange={handleChange}
            label={t('settings.database_config.url')}
            name="url"
            type="url"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={3}>
        <FormControl variant="outlined" className="w-100">
          <InputLabel htmlFor="port">
            {t('settings.database_config.port')}
          </InputLabel>
          <OutlinedInput
            id="port"
            value={state.port}
            placeholder={t('settings.database_config.enter_port')}
            onChange={handleChange}
            label={t('settings.database_config.port')}
            name="port"
            type="number"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl variant="outlined" className="w-100">
          <InputLabel htmlFor="name">
            {t('settings.database_config.name')}
          </InputLabel>
          <OutlinedInput
            id="name"
            value={state.name}
            placeholder={t('settings.database_config.enter_name')}
            onChange={handleChange}
            label={t('settings.database_config.name')}
            name="name"
            type="text"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl variant="outlined" className="w-100">
          <InputLabel htmlFor="user">
            {t('settings.database_config.user')}
          </InputLabel>
          <OutlinedInput
            id="user"
            value={state.user}
            placeholder={t('settings.database_config.enter_user')}
            onChange={handleChange}
            label={t('settings.database_config.user')}
            name="user"
            type="text"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl variant="outlined" className="w-100">
          <InputLabel htmlFor="password">
            {t('settings.database_config.password')}
          </InputLabel>
          <OutlinedInput
            id="password"
            value={state.password}
            placeholder={t('settings.database_config.enter_password')}
            onChange={handleChange}
            label={t('settings.database_config.password')}
            name="password"
            type="password"
            required
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
