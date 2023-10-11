import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RoleInfo from "../../components/RoleInfo/RoleInfo";
import { useApis } from "../../hooks/api";
import { useRoles } from "../../hooks/role";
import useAppStore from "../../store/AppStore";
import { UpdateRoleType } from "../../store/enum/UpdateRoleType";
import { Api } from "../../store/interfaces/Api";
import { Role } from "../../store/interfaces/Role";
import { RefreshCheck } from "../../utils/localStorage";

function ApiRolesView() {

  const store = useAppStore();

  const [error, setError] = useState<string>('');

  const apisQuery = useApis((data) => {
    setApis(data);
  }, (error) => {
    setError(error.message);
  });
  const rolesQuery = useRoles((data) => {
    setRoles(data);
  }, (error) => {
    setError(error.message);
  }); 

  const [apis, setApis] = useState<Api[]>(apisQuery.data || []);
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
          Update Api Roles
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <Box sx={{flex: '0 0 auto', width: '90%'}}>
          {apis.map(api => (
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
      </Box>
    </Stack>
  );
};

export default ApiRolesView;