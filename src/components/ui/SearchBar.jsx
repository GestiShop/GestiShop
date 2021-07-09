/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    paddingRight: '8px',
  },
}));

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const classes = useStyles();

  const handleInput = (event) => {
    setQuery(event.target.value);
    onSubmit(event.target.value);
  };

  return (
    <TextField
      value={query}
      variant="outlined"
      fullWidth
      className={classes.margin}
      onInput={handleInput}
      placeholder={t('accounting_module.placeholders.search')}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
