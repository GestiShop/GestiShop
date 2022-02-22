export const CURRENCY_LIST = ['eur', 'usd'] as const;
export type PlatformCurrencyCode = typeof CURRENCY_LIST[number];
export const DEFAULT_CURRENCY_CODE: PlatformCurrencyCode = CURRENCY_LIST[0];

export const LANGUAGE_LIST = ['en', 'es', 'ca'] as const;
export type PlatformLanguageCode = typeof LANGUAGE_LIST[number];
export const DEFAULT_LANG_CODE: PlatformLanguageCode = LANGUAGE_LIST[0];

export const DECIMAL_MODES = ['trunk', 'round-up', 'round-down'] as const;
export type PlatformDecimalModeCode = typeof DECIMAL_MODES[number];
export const DEFAULT_DECIMAL_MODE_CODE: PlatformDecimalModeCode =
  DECIMAL_MODES[0];

export const FLOATING_POSITION_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;
export type PlatformFloatingPositionOption =
  typeof FLOATING_POSITION_OPTIONS[number];
export const DEFAULT_FLOATING_POSITION_OPTION_CODE: PlatformFloatingPositionOption =
  FLOATING_POSITION_OPTIONS[0];

export type PlatformCurrencyInfo = {
  currencyCode: PlatformCurrencyCode;
  decimalModeCode: PlatformDecimalModeCode;
  floatingPositions: PlatformFloatingPositionOption;
};
export const DEFAULT_CURRENCY_INFO: PlatformCurrencyInfo = {
  currencyCode: DEFAULT_CURRENCY_CODE,
  decimalModeCode: DEFAULT_DECIMAL_MODE_CODE,
  floatingPositions: DEFAULT_FLOATING_POSITION_OPTION_CODE,
};

export const EVENT_COLOR_LIST = [
  {
    background: 'lightseagreen',
    text: 'white',
  },
  {
    background: 'lightblue',
    text: 'darkslategray',
  },
  {
    background: 'lightcoral',
    text: 'darkslategray',
  },
  {
    background: 'lightgoldenrodyellow',
    text: 'darkslategray',
  },
  {
    background: 'lightcyan',
    text: 'darkslategray',
  },
  {
    background: 'lightpink',
    text: 'darkslategray',
  },
  {
    background: 'lightgreen',
    text: 'darkslategray',
  },
  {
    background: 'lightsalmon',
    text: 'darkslategray',
  },
  {
    background: 'lightgray',
    text: 'darkslategray',
  },
] as const;
export type PlatformEventColorCode = typeof EVENT_COLOR_LIST[number];
export const DEFAULT_EVENT_COLOR_CODE: PlatformEventColorCode =
  EVENT_COLOR_LIST[0];
