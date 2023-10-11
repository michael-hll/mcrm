import { Box } from "@mui/material";
import { useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useRoles } from "../../hooks/role";
import { useUserRoles } from "../../hooks/user";
import { Role } from "../../store/interfaces/Role";
import { User } from "../../store/interfaces/User";

function UserRolesView() {

  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

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
  const [roles, setRoles] = useState<Role[]>(rolesQuery.data || []);

  return (
    
    <Box>
      {users.map(user => (
        <RoleInfo
          key={user.id}
          id={user.id!.toString()}
          name={user.username!}
          description={`Email: ${user.email} Phone: ${user.cellphone} Country: ${user.country} Address: ${user.address1}`}
          roles={user.roles?.map(role => role.code!) || []}
          allRoles={roles.map(role => role.code!)}
          updateSelector={'user'}
        />))}
    </Box>
  );
};

export default UserRolesView;