import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultBusinessInfo } from '../../redux/configuration';

const useStyles = makeStyles(() =>
  createStyles({
    w100: {
      width: '100%',
    },
  })
);

const ConfigBusinessInfo = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const defaultBusinessInfo = useSelector(
    (store: any) => store.configuration.businessInfo
  );

  const classes = useStyles();

  const [state, setState] = React.useState(defaultBusinessInfo);

  const handleChange = (event: any) => {
    const newState = {
      ...state,
      [event.target.name]: event.target.value,
    };

    setState(newState);
    dispatch(setDefaultBusinessInfo(newState));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.w100}>
          <InputLabel htmlFor="name">
            {t('settings.business_config.name')}
          </InputLabel>
          <OutlinedInput
            id="name"
            value={state.name}
            placeholder={t('settings.business_config.enter_name')}
            onChange={handleChange}
            label={t('settings.business_config.name')}
            name="name"
            type="text"
            required
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.w100}>
          <InputLabel htmlFor="nif">
            {t('settings.business_config.nif')}
          </InputLabel>
          <OutlinedInput
            id="nif"
            value={state.nif}
            placeholder={t('settings.business_config.enter_nif')}
            onChange={handleChange}
            label={t('settings.business_config.nif')}
            name="nif"
            type="text"
            required
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ConfigBusinessInfo;
