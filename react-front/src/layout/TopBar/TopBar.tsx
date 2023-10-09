import { AppBar, Box, SxProps, Toolbar, Typography } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';
import { MenuItemData, NestedDropdown } from 'mui-nested-menu';
import useAppStore from '../../store/AppStore';
import {useNavigate} from "react-router-dom"


interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}

const MENU_ITEM_WIDTH = '160PX';
const hide = 'none';
const props: SxProps = {
  width: '100px',
};

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const navigate = useNavigate(); 
  // TODO: dynamic genearte menu item data based on roles from database
  const menuItemsData: MenuItemData = {
    label: 'Navigation',
    items: [
      {
        label: 'Security',
        sx: { width: MENU_ITEM_WIDTH },
        items: [
          {
            label: 'Roles',
            callback: (event, item) => navigate('/role'),
            sx: { width: MENU_ITEM_WIDTH },
          },
          {
            label: 'Api Permissions',
            callback: (event, item) => console.log('Save As > Option 2 clicked', event, item),
            sx: { width: MENU_ITEM_WIDTH },
          },
          {
            label: 'Menu Permissions',
            callback: (event, item) => console.log('Save As > Option 2 clicked', event, item),
            sx: { width: MENU_ITEM_WIDTH },
          },
        ],
      },
      {
        label: 'Settings',
      },
    ],
  };
  let display = 'none';
  if(isAuthenticated) {
    display = 'flex';
  }
  return (
    <AppBar
      component="div"
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}
        <Box sx={{
          marginX: '24px', 
          display: {display},
        }}
        >
          <NestedDropdown
            menuItemsData={menuItemsData}
            MenuProps={{
              elevation: 1, sx: {
                marginLeft: '-8px',
                fontSize: '36px',
              }
            }}
            ButtonProps={{ variant: 'text', sx: {
              color: '#fff',
              textTransform: 'none',
              fontSize: '20px',
            }}}
            onClick={() => console.log('Clicked')}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            marginX: '36px',
            flexGrow: 1,
            textAlign: 'right',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        {endNode}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
