import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Container, Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/forms/Button';
import { fetchClientBills } from '../../../db/ClientBillHelper';
import generate347Model from '../../../utils/document-generator/347modelGenerator';

const DocumentGenerator = () => {
  const { t } = useTranslation();
  const componentRef = useRef();
  const [contentToPrint, setContentToPrint] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);

  const generate347ModelHandler = () => {
    fetchClientBills(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        // TODO: TREAT DATA
        const providers = [];
        const clients = [];
        setContentToPrint(generate347Model(providers, clients));
        setShouldPrint(true);
      }
    );
  };

  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: true,
    suppressErrors: true,
  });

  useEffect(() => {
    if (!shouldPrint) return;

    printHandler();
    setShouldPrint(false);
  }, [shouldPrint]);

  return (
    <>
      <Grid container className="h-100 center-content">
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12} className="d-flex">
                <Button onClick={generate347ModelHandler}>
                  {t('accounting_module.model.347.title')}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Box display="none" displayPrint="block" ref={componentRef}>
        {contentToPrint}
      </Box>
    </>
  );
};

export default DocumentGenerator;
