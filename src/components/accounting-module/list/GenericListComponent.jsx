/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Button from '../../ui/forms/Button';
import SearchBar from '../../ui/SearchBar';
import Table from '../../ui/Table';
import FullScreenDialog from '../../ui/FullscreenDialog';

const GenericListComponent = ({
  rows,
  headers,
  editCallback,
  searchCallback,
  deleteCallback,
  texts,
  creationComponent,
}) => {
  const [openCreationDialog, setOpenCreationDialog] = useState(false);
  const [initialState, setInitialState] = useState(false);

  const handleEdit = (index) => {
    setInitialState(rows[index]);
    setOpenCreationDialog(true);
  };

  const handleDialogClose = () => {
    setOpenCreationDialog(false);
    editCallback();
  };

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
                  className="m-auto"
                >
                  {texts.create}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <p>Filters go here</p>
              </Grid>
              <Grid item xs={3}>
                <SearchBar onSubmit={(query) => searchCallback(query)} />
              </Grid>

              <Grid item xs={12}>
                <Table
                  rows={rows}
                  headers={headers}
                  title={texts.title}
                  editCallback={(index) => handleEdit(index)}
                  deleteCallback={deleteCallback}
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