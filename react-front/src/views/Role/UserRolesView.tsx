import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useRoles } from "../../hooks/role";
import { useUserRoles } from "../../hooks/user";
import { Role } from "../../store/interfaces/Role";
import { User } from "../../store/interfaces/User";
import { UpdateRoleType } from "../../store/enum/UpdateRoleType";
import useAppStore from "../../store/AppStore";
import { RefreshCheck } from "../../utils/localStorage";

function UserRolesView() {

  const store = useAppStore();

  const [error, setError] = useState<string>('');

  const userRolesQuery = useUserRoles((data) => {
    setUsers(data);
  }, (error) => {
    setError(error.message);
  });
  const rolesQuery = useRoles((data) => {
    setRoles(data);
  }, (error) => {
    setError(error.message);
  }); 

  const [users, setUsers] = useState<User[]>(userRolesQuery.data || []);
  const [roles, setRoles] = useState<Role[]>(rolesQuery.data || []);

  useEffect(() => {
    RefreshCheck(store);
  }, [store]);

  return (
    <Stack>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 0px'
      }}>
        <Typography gutterBottom variant="h4"
          component="div" sx={{
            alignSelf: 'center',
          }}>
          Update User Roles
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <Box sx={{flex: '0 0 auto', width: '90%'}}>
          {users.map(user => (
            <RoleInfo
              key={user.id!}
              id={user.id!.toString()}
              name={user.username!}
              description={`Email: ${user.email} Phone: ${user.cellphone} Country: ${user.country} Address: ${user.address1}`}
              roles={user.roles?.map(role => role.code!) || []}
              allRoles={roles}
              updateSelector={UpdateRoleType.USER}
            />))}
        </Box>
      </Box>
    </Stack>
  );
};

export default UserRolesView;