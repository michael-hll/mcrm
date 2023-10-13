import { Autocomplete, Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useApis } from "../../hooks/api";
import { useRoles } from "../../hooks/role";
import useAppStore from "../../store/AppStore";
import { UpdateRoleType } from "../../store/enum/UpdateRoleType";
import { Api } from "../../store/interfaces/Api";
import { Role } from "../../store/interfaces/Role";
import { RefreshCheck } from "../../utils/localStorage";
import SearchIcon from '@mui/icons-material/Search';

function ApiRolesView() {

  const store = useAppStore();

  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const apisQuery = useApis((data) => {
    setApis(data);
    filterResult(filter, data);
  }, (error) => {
    setError(error.message);
  });
  const rolesQuery = useRoles((data) => {
    setRoles(data);
  }, (error) => {
    setError(error.message);
  });

  const [apis, setApis] = useState<Api[]>(apisQuery.data || []);
  const [searchedApis, setSearchedApis] = useState<Api[]>(apisQuery.data || []);
  const [roles, setRoles] = useState<Role[]>(rolesQuery.data || []);

  useEffect(() => {
    RefreshCheck(store);
  }, [store]);

  const filterResult = (filter: string, apis: Api[]) => {
    if (filter) {
      setSearchedApis(apis.filter(api => {
        const roles = api.roles?.map(role => role.code);
        const rolesSearched = roles?.filter(code => code?.includes(filter.toUpperCase()));
        return rolesSearched.length > 0 ||
          api.module_name.toUpperCase()?.includes(filter.toUpperCase()) ||
          api.controller_name.toUpperCase()?.includes(filter.toUpperCase()) ||
          api.api_name?.toUpperCase()?.includes(filter.toUpperCase()) ||
          api.key.toUpperCase()?.includes(filter.toUpperCase())
      }
      ))
    } else {
      setSearchedApis([...apis]);
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
          Update Api Roles
        </Typography>
      </Box>
      <Box sx={{ marginX: '5%' }}>
        <Stack >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Autocomplete
              sx={{ width: '400px', marginBottom: '4px' }}
              id="userQuickSearch"
              freeSolo
              options={apis.map(api => `${api.key}`)}
              onInputChange={(event, newInputValue, reason) => {
                setFilter(newInputValue);
                filterResult(newInputValue, apis);
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
            {searchedApis.map(api => (
              <RoleInfo
                key={api.key}
                id={api.key}
                name={`${api.controller_name}:${api.api_name}`}
                description={`[MODULE]: ${api.module_name} [CONTROLLER]: ${api.controller_name} [API]: ${api.api_name}`}
                roles={api.roles?.map(role => role.code!) || []}
                allRoles={roles}
                updateSelector={UpdateRoleType.API}
              />))}
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ApiRolesView;