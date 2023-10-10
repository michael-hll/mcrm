import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Typography } from "@mui/material";
import { RoleCodes } from '../../store/enum/RoleCodes';

interface RoleInfoProps {
  id: string;
  name: string;
  description: string;
  roles: string[];
  deleteHandler: (id: string, code: string) => void;
}

function RoleInfo({ id, name, description, roles, deleteHandler }: RoleInfoProps) {

  return (
    <Box sx={{
      width: '100%',
      margin: '4px 0px 4px 0px',
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        border: 1,
        borderBottomColor: 'gray',
      }}>
        <Typography variant="caption"
          sx={{
            margin: '0px 0px 0px 8px',
            flex: '1 0 50%',
          }}
        >
          {name}
        </Typography>
        <Typography variant="caption"
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
        <Typography variant="caption"
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
        {roles.map(role => {
          return <RoleCard key={role} id={id} code={role} deleteHandler={deleteHandler} />
        })}
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
  let showDeleteButton = ''
  if(code === RoleCodes.DEFAULT){
    showDeleteButton = 'none';
  }
  return (
    <Box
      sx={{ marginX: '2px', backgroundColor: 'red' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='caption'
          align='center'
          sx={{
            margin: '0px 4px 0px 2px',
            fontSize: '12px',
          }}
        >
          {code}
        </Typography>
        <IconButton aria-label="delete" onClick={() => deleteHandler(id, code)}
          sx={{
            width: '8px',
            height: '8px',
            display: showDeleteButton,
          }}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>

    </Box>
  );
}

export default RoleInfo;