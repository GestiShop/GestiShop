import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextField } from './forms';

type Props = {
  parent: string;
  disabled?: boolean;
  onInput?: (arg0: string, arg1: string) => void;
};

const AddressForm = ({
  parent,
  disabled = false,
  onInput = undefined,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={3}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.roadType`}
          label={t('accounting_module.address.road_type')}
        />
      </Grid>

      <Grid item xs={9}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.street`}
          label={t('accounting_module.address.street')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.number`}
          label={t('accounting_module.address.number')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.floor`}
          label={t('accounting_module.address.floor')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.door`}
          label={t('accounting_module.address.door')}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.extra`}
          label={t('accounting_module.address.extra')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.zipCode`}
          label={t('accounting_module.address.zip_code')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.city`}
          label={t('accounting_module.address.city')}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.province`}
          label={t('accounting_module.address.province')}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.state`}
          label={t('accounting_module.address.state')}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          required
          onInput={onInput}
          disabled={disabled}
          name={`${parent}.country`}
          label={t('accounting_module.address.country')}
        />
      </Grid>
    </>
  );
};

AddressForm.defaultProps = {
  disabled: false,
  onInput: undefined,
};

export default AddressForm;
