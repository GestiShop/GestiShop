/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  noStock: {
    backgroundColor: 'rgba(205, 92, 92, 0.45) !important',
    '&:hover': {
      backgroundColor: 'rgba(205, 92, 92, 0.65) !important',
    },
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
    t,
    hasActions,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': t('accounting_module.table.select_all'),
            }}
          />
        </TableCell>
        {headers.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc'
                    ? t('accounting_module.table.sorted_desc')
                    : t('accounting_module.table.sorted_asc')}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasActions ? (
          <TableCell align="right" padding="normal">
            {t('accounting_module.table.actions')}
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired,
  t: PropTypes.any.isRequired,
  hasActions: PropTypes.bool.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, title, t, deleteCallback } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {t('accounting_module.table.selected_rows', { num: numSelected })}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title={t('buttons.delete')}>
          <IconButton aria-label={t('buttons.delete')} onClick={deleteCallback}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t('accounting_module.table.filter_list')}>
          <IconButton aria-label={t('accounting_module.table.filter_list')}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.any.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};

const EnhancedTable = ({
  headers,
  rows,
  title,
  editCallback,
  deleteCallback,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(headers[0].id);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((n) => n._id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleEditClick = (event, id) => {
    event.stopPropagation();
    editCallback(id);
  };

  const handleClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const deleteItemsAndClose = () => {
    handleCloseDeleteDialog();
    deleteCallback(selected);
    setSelected([]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          t={t}
          deleteCallback={handleClickOpen}
        />
        <TableContainer>
          <Table className={classes.table} size="medium">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headers={headers}
              t={t}
              hasActions={editCallback != null}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const headerCells = [];
                  for (const header of headers) {
                    switch (header.id) {
                      case 'reference':
                        headerCells.push(
                          <TableCell
                            key="reference"
                            component="th"
                            id={labelId}
                            scope="row"
                            align="left"
                          >
                            {row.reference}
                          </TableCell>
                        );
                        break;
                      case 'visible':
                        if (row.visible === true) {
                          headerCells.push(
                            <TableCell
                              key={header.id}
                              align={header.align}
                              padding="normal"
                            >
                              <Chip
                                label={t(
                                  'accounting_module.product.state.available'
                                ).toUpperCase()}
                                icon={<VisibilityIcon />}
                                color="primary"
                              />
                            </TableCell>
                          );
                        } else {
                          headerCells.push(
                            <TableCell
                              key={header.id}
                              align={header.align}
                              padding="normal"
                            >
                              <Chip
                                label={t(
                                  'accounting_module.product.state.hidden'
                                ).toUpperCase()}
                                icon={<VisibilityOffIcon />}
                                color="secondary"
                              />
                            </TableCell>
                          );
                        }
                        break;
                      case 'parent':
                        headerCells.push(
                          <TableCell
                            key={header.id}
                            align={header.align}
                            padding="normal"
                          >
                            {row[header.id]
                              ? `[${row[header.id].reference}] ${
                                  row[header.id].name
                                }`
                              : '-'}
                          </TableCell>
                        );
                        break;
                      default:
                        headerCells.push(
                          <TableCell
                            key={header.id}
                            align={header.align}
                            padding="normal"
                          >
                            {row[header.id]}
                          </TableCell>
                        );
                        break;
                    }
                  }
                  if (editCallback) {
                    headerCells.push(
                      <TableCell key="actions" align="right" padding="normal">
                        <Tooltip title={t('buttons.edit')}>
                          <IconButton
                            aria-label={t('buttons.edit')}
                            onClick={(event) => handleEditClick(event, row._id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    );
                  }

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.reference}
                      selected={isItemSelected}
                      className={
                        row.stockAlert && row.stock <= row.minStock
                          ? classes.noStock
                          : null
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {headerCells}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('accounting_module.dialog.delete.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('accounting_module.dialog.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            {t('buttons.cancel')}
          </Button>
          <Button onClick={deleteItemsAndClose} color="primary" autoFocus>
            {t('buttons.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnhancedTable;
