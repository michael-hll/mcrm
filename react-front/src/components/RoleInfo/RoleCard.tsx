import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import useAppStore from "../../store/AppStore";
import { RoleCodes } from "../../store/enum/RoleCodes";
import { Role } from '../../store/interfaces/Role';

interface RoleCardProps {
  id: string,
  code: string;
  roles: Role[];
  alwaysShowDelete?: boolean;
  deleteHandler: (id: string, code: string) => void;
}

function RoleCard({ id, code, roles, alwaysShowDelete = false, deleteHandler }: RoleCardProps) {
  const currentUser = useAppStore(s => s.currentUser);

  const [cardColor, setCardColor] = useState<string>('#339af0');

  useEffect(() => {
    const role = roles.find(value => value.code === code);
    if (role) {
      setCardColor(role.color!);
    }
  }, [roles, code]);

  let showDeleteButton = '';
  let borderRightRadius = '0px';
  if (code === RoleCodes.DEFAULT ||
    (code === RoleCodes.ADMIN && id === currentUser?.id.toString())) {
    showDeleteButton = 'none';
    borderRightRadius = '2px';
  }
  if (alwaysShowDelete){
    showDeleteButton = '';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginX: '2px',
        marginY: '0px',
        padding: '0px',
        border: 1,
        borderColor: 'gray',
        borderRadius: '2px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',          
        }}
      >
        <Typography
          variant='body2'
          align='center'
          sx={{
            margin: '0px 0px 0px 0px',
            paddingX: '2px',
            backgroundColor: cardColor,
            flex: '1 0 auto',
            borderTopLeftRadius: '2px',
            borderBottomLeftRadius: '2px',
            borderTopRightRadius: borderRightRadius,
            borderBottomRightRadius: borderRightRadius,
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
            marginX: '2px',
          }}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default RoleCard;