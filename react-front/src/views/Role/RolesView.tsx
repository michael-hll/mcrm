import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import * as React from 'react';
import AppAlert from '../../components/AppAlert/AppAlert';
import { useCreateRole, useDeleteRole, useRoles, useUpdateRole } from '../../hooks/role';
import { Role, RoleGrid } from '../../store/interfaces/Role';
import CreateRoleView from './CreateRoleView';
import CustomSnackbar from '../../components/SnackBarAlert/CustomSnackbar';
import { AxiosError } from 'axios';

interface EditToolbarProps {
  openRoleDialog: (open: boolean) => void;
}

function EditToolbar(props: EditToolbarProps) {

  const handleAddRoleClick = () => {
    props.openRoleDialog(true);
  };

  return (
    <GridToolbarContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRoleClick}
          sx={{ textTransform: 'none' }}>
          Add Role
        </Button>
        <GridToolbarFilterButton sx={{ textTransform: 'none' }} />
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );
}

const RolesView = () => {
  const init_rows: RoleGrid[] = [];

  const [rows, setRows] = React.useState(init_rows);
  const [error, setError] = React.useState('');
  const [SnackBarMessage, setSnackBarMessage] = React.useState<string>('');
  const [SnackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
  const [roleDialogOpen, setRoleDialogOpen] = React.useState(false);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const rolesQuery = useRoles((data) => {
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
  }, (error: AxiosError, inputRole: Role) => {
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
    let oldRow = rows.find(row => row.code === id);
    if(oldRow){
      roleDeleteQuery.mutate(oldRow as Role)
    }
    setRows(rows.filter((row) => row.code !== id));
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
    
    const {isNew, ...newRole} = updatedRow as RoleGrid;
    let oldRow = rows.find(row => row.code === newRole.code);
    if(oldRow) {
      Object.assign(oldRow, updatedRow);
    }
    console.log(newRole);
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

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 128, editable: false },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
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
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        slots={{
          toolbar: EditToolbar,
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
    </div>
  );
}

export default RolesView;