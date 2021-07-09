import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultLang } from '../../redux/configuration';
import { LANGUAGE_LIST } from '../../../assets/config/config';

const ConfigLanguage = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const defaultLang = useSelector((store: any) => store.configuration.lang);

  const [lang, setLang] = React.useState(defaultLang);

  const handleChange = (event: any) => {
    const newLang = event.target.value;

    setLang(newLang);
    dispatch(setDefaultLang(newLang));
    i18n.changeLanguage(newLang.value);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="lang">
        {t('settings.language_config.language')}
      </InputLabel>
      <Select
        id="lang"
        value={lang}
        onChange={handleChange}
        label={t('settings.language_config.language')}
      >
        {LANGUAGE_LIST.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ConfigLanguage;
