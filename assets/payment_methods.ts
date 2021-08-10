const PAYMENT_METHODS = (t: any) => [
  {
    displayText: t('accounting_module.payment_methods.cash'),
    value: 'CASH',
  },
  {
    displayText: t('accounting_module.payment_methods.debit_card'),
    value: 'DEBIT_CARD',
  },
  {
    displayText: t('accounting_module.payment_methods.credit_card'),
    value: 'CREDIT_CARD',
  },
  {
    displayText: t('accounting_module.payment_methods.bizum'),
    value: 'BIZUM',
  },
  {
    displayText: t('accounting_module.payment_methods.paypal'),
    value: 'PAYPAL',
  },
  {
    displayText: t('accounting_module.payment_methods.wire_transfer'),
    value: 'WIRE_TRANSFER',
  },
  {
    displayText: t('accounting_module.payment_methods.check'),
    value: 'CHECK',
  },
  {
    displayText: t('accounting_module.payment_methods.others'),
    value: 'OTHERS',
  },
];

export default PAYMENT_METHODS;
