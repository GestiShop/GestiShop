import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from './forms/TextField';

const AddressForm = ({ parent }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={3}>
        <TextField
          name={`${parent}.roadType`}
          label={`${t('accounting_module.address.road_type')} *`}
        />
      </Grid>

      <Grid item xs={9}>
        <TextField
          name={`${parent}.street`}
          label={`${t('accounting_module.address.street')} *`}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          name={`${parent}.number`}
          label={`${t('accounting_module.address.number')} *`}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          name={`${parent}.floor`}
          label={t('accounting_module.address.floor')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          name={`${parent}.door`}
          label={t('accounting_module.address.door')}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          name={`${parent}.extra`}
          label={t('accounting_module.address.extra')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          name={`${parent}.zipCode`}
          label={`${t('accounting_module.address.zip_code')} *`}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          name={`${parent}.city`}
          label={`${t('accounting_module.address.city')} *`}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          name={`${parent}.province`}
          label={`${t('accounting_module.address.province')} *`}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          name={`${parent}.state`}
          label={t('accounting_module.address.state')}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          name={`${parent}.country`}
          label={`${t('accounting_module.address.country')} *`}
        />
      </Grid>
    </>
  );
};

AddressForm.propTypes = {
  parent: PropTypes.string.isRequired,
};

export default AddressForm;
