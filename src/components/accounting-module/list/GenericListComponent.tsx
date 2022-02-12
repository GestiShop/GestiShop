/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { Types } from 'mongoose';
import Button from '../../ui/forms/Button';
import FullScreenDialog from '../../ui/FullscreenDialog';

type Props = {
  isDataLoaded: any;
  rows: any;
  headers: any;
  editCallback?: any;
  deleteCallback?: any;
  printCallback?: any;
  texts: any;
  creationComponent: any;
};

const GenericListComponent = ({
  isDataLoaded,
  rows,
  headers,
  editCallback,
  deleteCallback,
  printCallback,
  texts,
  creationComponent,
}: Props): ReactElement => {
  const [openCreationDialog, setOpenCreationDialog] = useState(false);
  const [initialState, setInitialState] = useState(null);
  const [filteredRows, setFilteredRows] = useState(rows);

  const handlePrint = (id: Types.ObjectId) => {
    printCallback(rows.find((row: any) => row.id == id));
  };

  const handleEdit = (id: Types.ObjectId) => {
    setInitialState(rows.find((row: any) => row.id == id));
    setOpenCreationDialog(true);
  };

  const handleDialogClose = () => {
    setOpenCreationDialog(false);
    editCallback();
  };

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={3} className="d-flex">
                <Button
                  onClick={() => {
                    setInitialState(null);
                    setOpenCreationDialog(true);
                  }}
                >
                  {texts.create}
                </Button>
              </Grid>
              <Grid item xs={9} />

              <Grid item xs={12}>
                {/* <Table */}
                {/*   isDataLoaded={isDataLoaded} */}
                {/*   rows={filteredRows} */}
                {/*   headers={headers} */}
                {/*   title={texts.title} */}
                {/*   editCallback={handleEdit} */}
                {/*   deleteCallback={deleteCallback} */}
                {/*   printCallback={printCallback ? handlePrint : undefined} */}
                {/* /> */}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <FullScreenDialog
        open={openCreationDialog}
        closeCallback={handleDialogClose}
        title={initialState ? texts.edit : texts.create}
        childComponent={creationComponent}
        initialState={initialState}
      />
    </>
  );
};

GenericListComponent.defaultProps = {
  editCallback: undefined,
  deleteCallback: undefined,
  printCallback: undefined,
};

export default GenericListComponent;
