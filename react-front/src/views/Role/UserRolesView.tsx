import { useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useUserRoles } from "../../hooks/user";
import { Box } from "@mui/material";
import { User } from "../../store/interfaces/User";
import { Role } from "../../store/interfaces/Role";
import { useRoles } from "../../hooks/role";
import { RoleCodes } from "../../store/enum/RoleCodes";

function UserRolesView() {

  const userRolesQuery = useUserRoles((data) => {
    setUsers(data);
  }, (error) => {
    setError(error.message);
  });
  const rolesQuery = useRoles((data) => {
    setRoles(data);
    console.log('roles', data);
  }, (error) => {
    setError(error.message);
    console.log(error);
  });
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>(rolesQuery.data || []);

  function deleteRoleByUserId(id: string, code: string) {
    console.log('will delete: ', id, code);

  }

  function addRolesByUserId(id: string, codes: string[]) {
    console.log('will add: ', id, codes);

  }

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
          deleteHandler={deleteRoleByUserId}
          addHandler={addRolesByUserId}
        />))}
    </Box>
  );
};

export default UserRolesView;