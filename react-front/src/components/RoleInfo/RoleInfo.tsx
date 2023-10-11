import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Theme, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from 'react';
import { RoleCodes } from '../../store/enum/RoleCodes';

interface RoleInfoProps {
  id: string;
  name: string;
  description: string;
  roles: string[];
  allRoles: string[];
  deleteHandler: (id: string, code: string) => void;
  addHandler: (id: string, newRoles: string[], deleteRoles: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(code: string, codes: string[], theme: Theme) {
  return {
    fontWeight:
      codes.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    fontSize: '14px',
  };
}

function RoleInfo({ id, name, description, roles, allRoles, deleteHandler, addHandler}: RoleInfoProps) {

  const theme = useTheme();

  const [inputRoles, setInputRoles] = useState<string[]>(roles);
  const [inputRolesOriginal, setInputRolesOriginal] = useState<string[]>(roles);
  const [selectRoles, setSelectRoles] = useState<string[]>([]);

  useEffect(() => {
    setInputRolesOriginal(roles);
  }, [roles]);  

  const handleChange = (event: SelectChangeEvent<typeof selectRoles>) => {
    const {
      target: { value },
    } = event;
    setSelectRoles(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box sx={{
      width: '100%',
      margin: '4px 0px 4px 0px',
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        backgroundColor: '#1c7ed6',
        border: 1,
        borderBottomColor: 'gray',
      }}>
        <Typography variant="body1"
          sx={{
            margin: '0px 0px 0px 8px',
            flex: '1 0 50%',
          }}
        >
          {name}
        </Typography>
        <Typography variant="body1"
          sx={{
            margin: '0px 0px 0px 8px',
            flex: '1 0 50%',
          }}
        >
          Key: {id}
        </Typography>
      </Box>
      {/** Description */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderBottomColor: 'gray',
        borderTopColor: 'gray',
      }}>
        <Typography variant="body1"
          sx={{
            margin: '0px 0px 0px 8px',
          }}
        >
          {description}
        </Typography>
      </Box>
      {/** Roles */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        padding: '2px'
      }}>
        {/** Cards */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          marginRight: '8px',
        }}>
          {inputRoles.map(role => {
            return <RoleCard key={role} id={id} code={role} deleteHandler={(id, code) => {
              // delete it from roles
              console.log('before delete:', id, role, inputRoles);
              setInputRoles(inputRoles.filter(role => role !== code));
            }} />
          })}
        </Box>
        {/** Role dropdown list */}
        <Box sx={{
          display: 'flex',
          width: '256px',
          marginLeft: 'auto',
          marginRight: '4px',
        }}>
          <Select
            variant='outlined'
            multiple
            value={selectRoles}
            onChange={handleChange}
            MenuProps={MenuProps}
            sx={{
              width: '100%',
              height: '28px',
              fontSize: '16px',
            }}
          >
            {allRoles.map((code) => (
              <MenuItem
                key={code}
                value={code}
                style={getStyles(code, allRoles, theme)}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          float: 'right',
          marginLeft: 'auto',
        }}>
          {/** Add dropdown roles to panel */}
          <IconButton aria-label="add"
            onClick={() => {
              // update input roles
              setInputRoles([...inputRoles, ...selectRoles].filter((value, index, array) => {
                return array.indexOf(value) === index;
              }));
              setSelectRoles([]);
            }}
            sx={{
              width: '8px',
              height: '8px',
              marginLeft: '2px',
              marginRight: '2px',
              border: 0,
            }}>
            <AddIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          float: 'right',
          marginLeft: 'auto',
        }}>
          <IconButton aria-label="save"
            onClick={() => {
              const newRoles = inputRoles.filter(role => inputRolesOriginal.indexOf(role) < 0);
              const deleteRoles = inputRolesOriginal.filter(role => inputRoles.indexOf(role) < 0);              
              addHandler(id, newRoles, deleteRoles);
              setSelectRoles([]);
            }}
            sx={{
              width: '8px',
              height: '8px',
              marginLeft: '2px',
              marginRight: '2px',
              border: 0,
            }}>
            <SaveIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

interface RoleCardProps {
  id: string,
  code: string;
  deleteHandler: (id: string, code: string) => void;
}

function RoleCard({ id, code, deleteHandler }: RoleCardProps) {
  let showDeleteButton = '';
  let borderRightRadius = '0px';
  if (code === RoleCodes.DEFAULT) {
    showDeleteButton = 'none';
    borderRightRadius = '2px';
  }
  return (
    <Box
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        marginX: '2px', 
        marginY: '0px',
        padding: '0px', 
        height: '26px',
        border: 1, 
        borderColor: 'gray', 
        borderRadius: '2px', }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',          
        }}
      >
        <Typography
          variant='body1'
          align='center'
          sx={{
            margin: '0px 0px 0px 0px',
            padding: '0px 2px 0px 2px',
            backgroundColor: 'red',
            flex: '0 1 auto',
            borderTopLeftRadius: '2px',
            borderBottomLeftRadius: '2px',
            borderTopRightRadius: borderRightRadius,
            borderBottomRightRadius: borderRightRadius,
            height: '25px',
          }}
        >
          {code}
        </Typography>
        <IconButton aria-label="delete"
          onClick={() => deleteHandler(id, code)}
          sx={{
            width: '8px',
            height: '8px',
            display: showDeleteButton,
            marginLeft: '2px',
            marginRight: '2px',
            border: 0,
          }}>
          <ClearIcon sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>

    </Box>
  );
}

export default RoleInfo;