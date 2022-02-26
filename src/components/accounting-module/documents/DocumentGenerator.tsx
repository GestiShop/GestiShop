import React, { useRef, useState, useEffect, ReactElement } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Container, Grid, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/forms';
import { fetchClientsWithBills } from '../../../db/ClientHelper';
import { fetchProvidersWithBills } from '../../../db/ProviderHelper';
import generate347Model from '../../../utils/document-generator/347modelGenerator';
import generate130Model from '../../../utils/document-generator/130modelGenerator';
import generate303Model from '../../../utils/document-generator/303modelGenerator';

const DocumentGenerator = (): ReactElement => {
  const { t } = useTranslation();
  const componentRef = useRef();
  const [contentToPrint, setContentToPrint] = useState<ReactElement | null>(
    null
  );
  const [shouldPrint, setShouldPrint] = useState<boolean>(false);

  const generate130ModelHandler = async (): Promise<void> => {
    const clients = await fetchClientsWithBills();
    const providers = await fetchProvidersWithBills();

    setContentToPrint(generate130Model(providers, clients));
    setShouldPrint(true);
  };

  const generate303ModelHandler = async (): Promise<void> => {
    const clients = await fetchClientsWithBills();
    const providers = await fetchProvidersWithBills();

    setContentToPrint(generate303Model(providers, clients));
    setShouldPrint(true);
  };

  const generate347ModelHandler = async (): Promise<void> => {
    const clients = await fetchClientsWithBills();
    const providers = await fetchProvidersWithBills();

    setContentToPrint(generate347Model(providers, clients));
    setShouldPrint(true);
  };

  const printHandler = useReactToPrint({
    content: () => componentRef?.current ?? null,
    removeAfterPrint: true,
    suppressErrors: true,
  });

  useEffect((): void => {
    if (!shouldPrint) {
      return;
    }

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
                <Button onClick={generate130ModelHandler}>
                  {t('accounting_module.model.130.title')}
                </Button>
              </Grid>

              <Grid item xs={12} className="d-flex">
                <Button onClick={generate303ModelHandler}>
                  {t('accounting_module.model.303.title')}
                </Button>
              </Grid>

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
