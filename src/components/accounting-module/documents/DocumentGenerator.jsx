import React, { useRef, useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/forms/Button';

const DocumentGenerator = () => {
  const { t } = useTranslation();
  const componentRef = useRef();
  const [contentToPrint, setContentToPrint] = useState(null);

  const generate347Model = () => {};

  return (
    <>
      <Grid container className="h-100 center-content">
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12} className="d-flex">
                <Button onClick={generate347Model}>
                  {t('accounting_module.model.347')}
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
