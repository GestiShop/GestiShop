/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Button from '../../ui/forms/Button';
import Table from '../../ui/Table';
import FullScreenDialog from '../../ui/FullscreenDialog';

const GenericListComponent = ({
  isDataLoaded,
  rows,
  headers,
  editCallback,
  deleteCallback,
  printCallback,
  texts,
  creationComponent,
}) => {
  const [openCreationDialog, setOpenCreationDialog] = useState(false);
  const [initialState, setInitialState] = useState(false);
  const [filteredRows, setFilteredRows] = useState(rows);

  const handlePrint = (id) => {
    printCallback(rows.find((row) => row._id == id));
  };

  const handleEdit = (id) => {
    setInitialState(rows.find((row) => row._id == id));
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
                <Table
                  isDataLoaded={isDataLoaded}
                  rows={filteredRows}
                  headers={headers}
                  title={texts.title}
                  editCallback={handleEdit}
                  deleteCallback={deleteCallback}
                  printCallback={printCallback ? handlePrint : undefined}
                />
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

export default GenericListComponent;
