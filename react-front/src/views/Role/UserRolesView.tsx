import { useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useUserRoles } from "../../hooks/user";
import { Box } from "@mui/material";
import { User } from "../../store/interfaces/User";

function UserRolesView() {
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const userRolesQuery = useUserRoles((data) => {
    setUsers(data);
  }, (error) => {
    setError(error.message);
  });

  function deleteRoleByUserId(id: string, code: string) {
    console.log('will delete: ', id, code);

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
          deleteHandler={deleteRoleByUserId}
        />))}
    </Box>
  );
};

export default UserRolesView;