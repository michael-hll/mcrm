import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';

interface DataGridToolbarProps {
  openRoleDialog: (open: boolean) => void;
  enableFilter?: boolean;
  enableQuickFilter?: boolean;
}

function DataGridToolbar({openRoleDialog, enableFilter = true, enableQuickFilter = true}: DataGridToolbarProps) {

  const handleAddRoleClick = () => {
    openRoleDialog(true);
  };

  return (
    <GridToolbarContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRoleClick}
          sx={{ textTransform: 'none' }}>
          Add Role
        </Button>
        {enableFilter && <GridToolbarFilterButton sx={{ textTransform: 'none' }} />}
        {enableQuickFilter && <GridToolbarQuickFilter />}
      </Box>
    </GridToolbarContainer>
  );
}

export default DataGridToolbar;