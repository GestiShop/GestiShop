import React, { ReactElement, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Print as PrintIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/forms';
import { FullScreenDialog } from '../../ui/FullscreenDialog';
import { Table } from '../../ui/Table';

type Props<T> = {
  id: string;
  rows: Array<T>;
  columns: Array<GridColDef>;
  texts: {
    create: string;
    edit: string;
    title: string;
  };
  creationComponent: ReactElement;
  editCallback?: () => void;
  printCallback?: () => void;
  deleteCallback?: (arg0: Array<Types.ObjectId>) => void;
};

const GenericListComponent = <T,>({
  id,
  rows,
  columns,
  texts,
  creationComponent,
  editCallback,
  deleteCallback,
  printCallback,
}: Props<T>): ReactElement => {
  const { t } = useTranslation();
  const [openCreationDialog, setOpenCreationDialog] = useState(false);
  const [initialState, setInitialState] = useState<Types.ObjectId | undefined>(
    undefined
  );

  const handleEdit = (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Types.ObjectId
  ) => {
    event.stopPropagation();
    setInitialState(id);
    setOpenCreationDialog(true);
  };

  const handlePrint = (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Types.ObjectId
  ) => {
    event.stopPropagation();
    printCallback?.();
  };

  const handleDialogClose = () => {
    setOpenCreationDialog(false);
    if (editCallback) {
      editCallback();
    }
  };

  columns.push({
    field: 'actions',
    headerName: t('accounting_module.table.actions'),
    sortable: false,
    filterable: false,
    disableExport: true,
    flex: 1,
    align: 'right',
    renderCell: (params) => (
      <Box
        component="div"
        className="d-flex justify-content-between align-items-center"
      >
        {editCallback && (
          <Tooltip title={t('buttons.edit') as string}>
            <IconButton
              aria-label={t('buttons.edit')}
              onClick={(event) => handleEdit(event, params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {printCallback && (
          <Tooltip title={t('buttons.print') as string}>
            <IconButton
              aria-label={t('buttons.print')}
              onClick={(event) => handlePrint(event, params.row.id)}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  });

  return (
    <Box component="div" id={id}>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ padding: '1rem' }}>
                  <Typography variant="h6" component="div">
                    {texts.title}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={3} className="d-flex">
                <Button
                  onClick={() => {
                    setInitialState(undefined);
                    setOpenCreationDialog(true);
                  }}
                >
                  {texts.create}
                </Button>
              </Grid>

              <Grid item xs={9} />

              <Grid item xs={12}>
                <Table columns={columns} rows={rows} />
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
    </Box>
  );
};

GenericListComponent.defaultProps = {
  editCallback: undefined,
  deleteCallback: undefined,
  printCallback: undefined,
};

export default GenericListComponent;
