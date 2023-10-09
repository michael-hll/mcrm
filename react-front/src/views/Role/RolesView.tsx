import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel
} from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import * as React from 'react';
import AppAlert from '../../components/AppAlert/AppAlert';
import AppDeleteDialog from '../../components/AppDeleteDialog/AppDeleteDialog';
import CustomSnackbar from '../../components/SnackBarAlert/CustomSnackbar';
import { useDeleteRole, useRoles, useUpdateRole } from '../../hooks/role';
import { Role, RoleGrid } from '../../store/interfaces/Role';
import CreateRoleView from './CreateRoleView';
import DataGridToolbar from '../../components/DataGrid/DataGridToolBar';
import { Stack } from '@mui/system';
import { RefreshCheck } from '../../utils/localStorage';
import useAppStore from '../../store/AppStore';
import { RoleCodes } from '../../store/enum/RoleCodes';

const RolesView = () => {

  const store = useAppStore();
  React.useEffect(() => {
    RefreshCheck(store);
  }, [store]);
  const init_rows: RoleGrid[] = [];

  const [rows, setRows] = React.useState(init_rows);
  const [error, setError] = React.useState('');
  const [SnackBarMessage, setSnackBarMessage] = React.useState<string>('');
  const [SnackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
  const [roleDialogOpen, setRoleDialogOpen] = React.useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = React.useState(false);
  const [deleteRoleCode, setDeleteRoleCode] = React.useState<string>('');
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  useRoles((data) => {
    setRows(data.map(role => ({ ...role, isNew: false })));
  }, (error) => {
    setError(error.message);
  });

  const roleUpdateQuery = useUpdateRole((role: Role) => {
    setSnackBarMessage('Update role success!');
    setSnackBarOpen(true);
    setRowModesModel({ ...rowModesModel, [role.code!]: { mode: GridRowModes.View } });
  }, (error: AxiosError, inputRole: Role) => {
    setRowModesModel({ ...rowModesModel, [inputRole.code!]: { mode: GridRowModes.Edit } });
    setError((error.response?.data as { message: string }).message);
  });

  const roleDeleteQuery = useDeleteRole((role: Role) => {
    setSnackBarMessage('Delete role success!');
    setSnackBarOpen(true);
    setDeleteRoleCode('');
    setDeleteConfirmDialogOpen(false);
  }, (error: AxiosError, inputRole: Role) => {
    setDeleteRoleCode('');
    setDeleteConfirmDialogOpen(false);
    setError((error.response?.data as { message: string }).message);
  });

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setDeleteRoleCode(id.toString());
    setDeleteConfirmDialogOpen(true);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: RoleGrid) => row.code === id);
    if (editedRow && editedRow.isNew) {
      setRows(rows.filter((row: RoleGrid) => row.code !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: RoleGrid) => (row.code === newRow.code ? updatedRow : row)));

    const { isNew, ...newRole } = updatedRow as RoleGrid;
    let oldRow = rows.find(row => row.code === newRole.code);
    if (oldRow) {
      Object.assign(oldRow, updatedRow);
    }
    roleUpdateQuery.mutate(newRole);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCloseError = React.useCallback(() => {
    setError('')
  }, []);

  const handleRoleDialogClose = (_: {}, reason: string) => {
    if (reason !== 'backdropClick') {
      setRoleDialogOpen(false);
    };
  };

  const handleCreateRoleSuccess = (success: boolean) => {
    if (success) {
      setSnackBarMessage('Create role success!');
      setSnackBarOpen(true);
    }
    setRoleDialogOpen(false);
  }

  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleDeleteConfirm = (code: string) => {
    let oldRow = rows.find(row => row.code === code);
    if (oldRow) {
      roleDeleteQuery.mutate(oldRow as Role)
    }
    if(code !== RoleCodes.ADMIN && code !== RoleCodes.DEFAULT){
      setRows(rows.filter((row) => row.code !== code));
    }    
  }

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 128, editable: false },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ]

  return (
    <Stack>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 0px'
      }}>
        <Typography gutterBottom variant="h4"
          component="div" sx={{
            alignSelf: 'center',
          }}>
          Roles
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <DataGrid
            sx={{width: '900px'}}
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            slots={{
              toolbar: DataGridToolbar,
            }}
            slotProps={{
              toolbar: { openRoleDialog: setRoleDialogOpen, showQuickFilter: true },
            }}
            getRowId={(row: RoleGrid) => row.code || ((new Date()).toDateString())}
          />
          {error ? (
            <AppAlert severity="error" onClose={handleCloseError}>
              {error}
            </AppAlert>
          ) : null}
          <Grid item xs={12}>
            <CustomSnackbar
              open={SnackBarOpen}
              onClose={handleSnackClose}
              message={SnackBarMessage} />
          </Grid>
          <Dialog open={roleDialogOpen} onClose={handleRoleDialogClose}>
            <DialogContent sx={{ padding: '1px', borderRadius: '5px' }}>
              <CreateRoleView closeDialog={handleCreateRoleSuccess} />
            </DialogContent>
          </Dialog>
          <AppDeleteDialog<string>
            message={'Are you sure do delete this role? All the permissions linked with this role will also be removed.'}
            args={deleteRoleCode}
            open={deleteConfirmDialogOpen}
            handleClose={() => { setDeleteConfirmDialogOpen(false) }}
            handleConfim={handleDeleteConfirm} />
        </Box>
      </Box>
    </Stack>
  );
}

export default RolesView;