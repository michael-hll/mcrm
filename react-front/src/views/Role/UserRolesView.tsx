import { Autocomplete, Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useRoles } from "../../hooks/role";
import { useUserRoles } from "../../hooks/user";
import { Role } from "../../store/interfaces/Role";
import { User } from "../../store/interfaces/User";
import { UpdateRoleType } from "../../store/enum/UpdateRoleType";
import useAppStore from "../../store/AppStore";
import { RefreshCheck } from "../../utils/localStorage";
import SearchIcon from '@mui/icons-material/Search';

function UserRolesView() {

  const store = useAppStore();

  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const userRolesQuery = useUserRoles((data) => {
    setUsers(data);
    filterResult(filter, data);
  }, (error) => {
    setError(error.message);
  });
  const rolesQuery = useRoles((data) => {
    setRoles(data);
  }, (error) => {
    setError(error.message);
  });

  const [users, setUsers] = useState<User[]>(userRolesQuery.data || []);
  const [searchedUsers, setSearchedUsers] = useState<User[]>(userRolesQuery.data || []);
  const [roles, setRoles] = useState<Role[]>(rolesQuery.data || []);

  useEffect(() => {
    RefreshCheck(store);
  }, [store]);

  const filterResult = (filter: string, users: User[]) => {
    if (filter) {
      setSearchedUsers(users.filter(user => {
        const roles = user.roles?.map(role => role.code);
        const rolesSearched = roles?.filter(code => code?.includes(filter.toUpperCase()));
        return (rolesSearched ? rolesSearched?.length > 0 : false) ||
          user.username?.toUpperCase()?.includes(filter.toUpperCase()) ||
          user.email?.toUpperCase()?.includes(filter.toUpperCase()) ||
          user.firstname?.toUpperCase()?.includes(filter.toUpperCase()) ||
          user.lastname?.toUpperCase()?.includes(filter.toUpperCase())
      }
      ))
    } else {
      setSearchedUsers([...users]);
    }
  }

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
      <Box sx={{ marginX: '5%' }}>
        <Stack >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Autocomplete
              sx={{ width: '200px', marginBottom: '4px' }}
              id="userQuickSearch"
              freeSolo
              options={users.map(user => user.email)}
              onInputChange={(event, newInputValue, reason) => {
                setFilter(newInputValue);
                filterResult(newInputValue, users);
              }}
              renderInput={(params) => {
                params.InputProps.startAdornment = (
                  <>
                    <InputAdornment position="start">{<SearchIcon />}</InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                );
                return <TextField {...params} variant="standard" placeholder={'Quick Search'} />;
              }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            {searchedUsers.map(user => (
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
        </Stack>
      </Box>
    </Stack>
  );
};

export default UserRolesView;