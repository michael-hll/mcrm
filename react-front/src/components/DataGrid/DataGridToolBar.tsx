import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';

interface DataGridToolbarProps<T> {
  action: (args: T) => void;
  actionArgs: T;
  actionLabel: string;
  enableFilter?: boolean;
  enableQuickFilter?: boolean;
}

/**
 * 
 * @param action: `(args: T) => void`
 * @param actionArgs: `actionArgs: T`
 * @param actionLabel: `actionLabel: string`
 * @param enableFilter: `enableFilter?: boolean`
 * @param enableQuickFilter: `enableQuickFilter?: boolean`
 * @returns actionArgs
 */
function DataGridToolbar<T>({
  action,
  actionArgs,
  actionLabel,
  enableFilter = true,
  enableQuickFilter = true }: DataGridToolbarProps<T>) {

  const handleButton1Click = () => {
    action(actionArgs);
  };

  return (
    <GridToolbarContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleButton1Click}
          sx={{ textTransform: 'none' }}>
          {actionLabel}
        </Button>
        {enableFilter && <GridToolbarFilterButton sx={{ textTransform: 'none' }} />}
        {enableQuickFilter && <GridToolbarQuickFilter />}
      </Box>
    </GridToolbarContainer>
  );
}

export default DataGridToolbar;