import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Typography } from "@mui/material";
import useAppStore from "../../store/AppStore";
import { RoleCodes } from "../../store/enum/RoleCodes";
import { useQueryClient } from '@tanstack/react-query';
import { MCRM_QUERY_ROLES } from '../../services/app.constants';
import { Role } from '../../store/interfaces/Role';
import { useEffect, useState } from 'react';

interface RoleCardProps {
  id: string,
  code: string;
  roles: Role[];
  deleteHandler: (id: string, code: string) => void;
}

function RoleCard({ id, code, roles, deleteHandler }: RoleCardProps) {
  const currentUser = useAppStore(s => s.currentUser);

  const [cardColor, setCardColor] = useState<string>('#339af0');

  useEffect(() => {
    const role = roles.find(value => value.code === code);
    if (role) {
      setCardColor(role.color!);
    }
  }, [roles]);

  let showDeleteButton = '';
  let borderRightRadius = '0px';
  if (code === RoleCodes.DEFAULT ||
    (code === RoleCodes.ADMIN && id === currentUser?.id.toString())) {
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
          variant='body1'
          align='center'
          sx={{
            margin: '0px 0px 0px 0px',
            padding: '0px 2px 0px 2px',
            backgroundColor: cardColor,
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

export default RoleCard;