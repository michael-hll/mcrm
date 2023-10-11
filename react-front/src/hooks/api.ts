import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { MCRM_QUERY_APIS } from "../services/app.constants";
import { Api, UpdateApiRolesMany } from "../store/interfaces/Api";
import { useAccessToken } from "./auth";
import { UpdateResourceRoles } from "../store/interfaces/Role";


export const useApis = (
    handleSuccess? : (data: Api[]) => void, 
    handleError? : (error: Error) => void) => {

  const authorizationHeader = useAccessToken();

  const fetchApis = () => {
    const api = new ApiClient<Api, Api>('authorization/apis');
    return api.getAll({ headers: authorizationHeader });
  }

  return useQuery<Api[], Error>({
    queryKey: [MCRM_QUERY_APIS],
    queryFn: fetchApis,
    staleTime: Infinity,
    cacheTime: 0,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error: Error) => {  
      handleError?.(error);
      return error;
    },
    onSuccess: (data: Api[]) => {
      handleSuccess?.(data);
    }
  });
};

export const useUpdateApiRoles = (
  handleSuccess?: () => void,
  handleError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();

  return useMutation<boolean, Error, UpdateResourceRoles, UpdateResourceRoles>({

    mutationFn: async (updateRoles: UpdateResourceRoles) => {
      const api = new ApiClient<UpdateApiRolesMany, boolean>('authorization/api-roles');
      return await api.patch({ headers: authHeader }, 
        {apis: [{api_key: updateRoles.id, roles: updateRoles.roles.roles}]});
    },
    
    onMutate: (variables: UpdateResourceRoles) => {
      return variables;
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_APIS],
      });
      handleSuccess?.();
    },

    onError: (error: Error, variables: UpdateResourceRoles) => {
      handleError?.(error);
      return error;
    },
  });
};

