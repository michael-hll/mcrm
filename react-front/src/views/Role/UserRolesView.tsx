import { useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useUpdateUserRoles, useUserRoles } from "../../hooks/user";
import { Box } from "@mui/material";
import { User } from "../../store/interfaces/User";
import { Role } from "../../store/interfaces/Role";
import { useRoles } from "../../hooks/role";
import { AddRemoveRoles } from "../../store/interfaces/AddRemoveRoles";
import { EntityOperations } from "../../store/interfaces/EntityOperations";

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

  const userRolesUpdateQuery = useUpdateUserRoles(() => {
    console.log('success');
  }, (error) => {
    console.log(error.message);
    setError(error.message);
  });

  function deleteRoleByUserId(id: string, code: string) {
    console.log('will delete: ', id, code);

  }

  function addRolesByUserId(id: string, newRoles: string[], deleteRoles: string[]) {
    console.log('will add: ', id, 'new:', newRoles, 'del:', deleteRoles);
    const updateRoles: AddRemoveRoles[] = [];
    for(const role of newRoles){
      updateRoles.push({code: role, operation: EntityOperations.CREATE});
    }
    for(const role of deleteRoles){
      updateRoles.push({code: role, operation: EntityOperations.DELETE});
    }
    userRolesUpdateQuery.mutate({id: id.toString(), roles: {roles: updateRoles}});
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