import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from 'react';
import { useUpdateRoleSelector } from '../../hooks/role';
import useAppStore from '../../store/AppStore';
import { AddRemoveRoles } from '../../store/interfaces/AddRemoveRoles';
import { EntityOperations } from '../../store/interfaces/EntityOperations';
import { Role } from '../../store/interfaces/Role';
import CustomSnackbar from '../SnackBarAlert/CustomSnackbar';
import RoleCard from './RoleCard';
import { UpdateRoleType } from '../../store/enum/UpdateRoleType';

interface RoleInfoProps {
  id: string;
  name: string;
  description: string;
  roles: string[];
  allRoles: Role[];
  updateSelector: UpdateRoleType;
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

function RoleInfo({ id, name, description, roles, allRoles, updateSelector }: RoleInfoProps) {

  const darkMode = useAppStore(s => s.darkMode);
  const theme = useTheme();
  const [borderColor, setBorderColor] = useState<string>('#495057');
  const [headerTextColor, setHeaderTextColor] = useState<string>('#fff');
  const [headerBGColor, setHeaderBGColor] = useState<string>('#fff');
  const [error, setError] = useState<string>('');
  const [SnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [SnackBarMessage, setSnackBarMessage] = useState<string>('');
  const [inputRoles, setInputRoles] = useState<string[]>(roles);
  const [inputRolesOriginal, setInputRolesOriginal] = useState<string[]>(roles);
  const [selectRoles, setSelectRoles] = useState<string[]>([]);
  const [enableSave, setEnableSave] = useState<boolean>(false);
  const [enableAdd, setEnableAdd] = useState<boolean>(false);

  useEffect(() => {
    if(darkMode){
      setBorderColor('#495057');
      setHeaderTextColor('#f8f9fa');
      setHeaderBGColor('#495057');
    }else{
      setBorderColor('#ced4da');
      setHeaderTextColor('#212529');
      setHeaderBGColor('#ced4da');
    }
  }, [darkMode]);

  const UpdateQuery = useUpdateRoleSelector(updateSelector)(() => {
    setInputRolesOriginal(inputRoles);
    setEnableSave(false);
    setSnackBarMessage('Update user role success!');
    setSnackBarOpen(true);
    setError('');
  }, (error) => {
    setError(error.message);
  });

  function commitRolesByUserId(id: string, newRoles: string[], deleteRoles: string[]) {
    const updateRoles: AddRemoveRoles[] = [];
    for (const role of newRoles) {
      updateRoles.push({ code: role, operation: EntityOperations.CREATE });
    }
    for (const role of deleteRoles) {
      updateRoles.push({ code: role, operation: EntityOperations.DELETE });
    }
    UpdateQuery.mutate({ id: id.toString(), roles: { roles: updateRoles } });
  }

  const handleRoleSelectChange = (event: SelectChangeEvent<typeof selectRoles>) => {
    const {
      target: { value },
    } = event;
    setSelectRoles(
      typeof value === 'string' ? value.split(',') : value,
    );
    setEnableAdd(true);
  };

  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <Box sx={{
      width: '100%',
      marginY: '4px',
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        border: 1,
        borderColor: borderColor,
        backgroundColor: headerBGColor,
        color: headerTextColor,
      }}>
        <Typography variant="body1"
          sx={{
            margin: '0px 0px 0px 8px',
            flex: '0 0 200px',
          }}
        >
          {name}
        </Typography>
        <Typography variant="body1"
          sx={{
            margin: '0px 0px 0px 8px',
            flex: '1 0 auto',
          }}
        >
          Id: {id}
        </Typography>
      </Box>
      {/** Description */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderColor: borderColor,
      }}>
        <Typography variant="body1"
          sx={{
            margin: '0px 0px 0px 8px',
            flex: '1 0 auto',
          }}
        >
          {description}
        </Typography>
        {/** error message */}
        {error && <Typography variant="body1"
          sx={{
            margin: '0px 8px 0px 8px',
            marginLeft: 'auto',
            color: '#fa5252',
          }}
        >
          {error}
        </Typography>}
      </Box>
      {/** Roles */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        borderLeft: 1,
        borderRight: 1,
        borderBottom: 1,
        borderColor: borderColor,
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
            return <RoleCard key={role} id={id} code={role} roles={allRoles} deleteHandler={(id, code) => {
              setInputRoles(inputRoles.filter(role => role !== code));
              setEnableSave(true);
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
            onChange={handleRoleSelectChange}
            MenuProps={MenuProps}
            sx={{
              width: '100%',
              height: '28px',
              fontSize: '16px',
            }}
          >
            {allRoles.map((role) => (
              <MenuItem
                key={role.code}
                value={role.code}
                style={getStyles(role.code!, allRoles.map(role => role.code!), theme)}
              >
                {role.code}
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
            disabled={!enableAdd}
            onClick={() => {
              // update input roles
              setInputRoles([...inputRoles, ...selectRoles].filter((value, index, array) => {
                return array.indexOf(value) === index;
              }));
              setEnableSave(true);
              setEnableAdd(false);
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
            disabled={!enableSave}
            onClick={() => {
              const newRoles = inputRoles.filter(role => inputRolesOriginal.indexOf(role) < 0);
              const deleteRoles = inputRolesOriginal.filter(role => inputRoles.indexOf(role) < 0);
              commitRolesByUserId(id, newRoles, deleteRoles);
              setSelectRoles([]);
              setEnableAdd(false);
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
        <CustomSnackbar
          open={SnackBarOpen}
          onClose={handleSnackClose}
          message={SnackBarMessage} />
      </Box>
    </Box>
  );
}

export default RoleInfo;