import { AppBar, Box, SxProps, Toolbar, Typography } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';
import { MenuItemData, NestedDropdown } from 'mui-nested-menu';
import useAppStore from '../../store/AppStore';

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

const menuItemsData: MenuItemData = {
  label: 'Navigation',
  items: [
    {
      label: 'Security',
      sx: { width: MENU_ITEM_WIDTH },
      items: [
        {
          label: 'Role',
          callback: (event, item) => console.log('Save As > Option 1 clicked', event, item),
          sx: { width: MENU_ITEM_WIDTH },
          items: [
            {
              label: 'Create',
              sx: { width: MENU_ITEM_WIDTH},
            },
            {
              label: 'View',
              sx: { width: MENU_ITEM_WIDTH, display: hide },
            }
          ]
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

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
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
          marginLeft: '36px', 
          display: {display},
        }}
        >
          <NestedDropdown
            menuItemsData={menuItemsData}
            MenuProps={{
              elevation: 1, sx: {
                marginLeft: '16px',
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
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
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
