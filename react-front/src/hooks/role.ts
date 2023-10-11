import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { MCRM_QUERY_ROLES } from "../services/app.constants";
import { Role } from "../store/interfaces/Role";
import { useAccessToken } from "./auth";
import { AxiosError } from "axios";
import { useUpdateUserRoles } from "./user";
import { UpdateRoleType } from "../store/enum/UpdateRoleType";


export const useRoles = (
    handleSuccess? : (data: Role[]) => void, 
    handleError? : (error: Error) => void) => {

  const authorizationHeader = useAccessToken();

  const fetchRoles = () => {
    const api = new ApiClient<Role, Role>('role');
    return api.getAll({ headers: authorizationHeader });
  }

  return useQuery<Role[], Error>({
    queryKey: [MCRM_QUERY_ROLES],
    queryFn: fetchRoles,
    staleTime: Infinity,
    cacheTime: 0,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error: Error) => {  
      handleError?.(error);
      return error;
    },
    onSuccess: (data: Role[]) => {
      handleSuccess?.(data);
    }
  });
};

export const useCreateRole = (
  handleSuccess?: (role: Role) => void, 
  handleError?: (error: AxiosError) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();

  return useMutation({

    mutationFn: async (role: Role) => {
      const api = new ApiClient<Role, Role>('role');
      return await api.post({ headers: authHeader }, role);
    },

    onMutate: (variables: Role) => {
      return variables;
    },

    onSuccess: (savedRole: Role, newRole: Role) => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_ROLES],
      });
      handleSuccess?.(savedRole);
    },

    onError: (error: AxiosError, variables: Role) => {
      handleError?.(error);
      return error;
    },
  });
};

export const useUpdateRole = (
  handleSuccess?: (role: Role) => void, 
  handleError?: (error: AxiosError, inputRole: Role) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();

  return useMutation({

    mutationFn: async (role: Role) => {
      const api = new ApiClient<Role, Role>('role');
      const {code, ...newRole} = role;
      return await api.patch({ headers: authHeader }, newRole, code!);
    },

    onMutate: (variables: Role) => {
      return variables;
    },

    onSuccess: (savedRole: Role, newRole: Role) => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_ROLES],
      });
      handleSuccess?.(savedRole);
    },

    onError: (error: AxiosError, variables: Role) => {
      handleError?.(error, variables);
      return error;
    },
  });
};

export const useDeleteRole = (
  handleSuccess?: (role: Role) => void, 
  handleError?: (error: AxiosError, inputRole: Role) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();

  return useMutation({

    mutationFn: async (role: Role) => {
      const api = new ApiClient<Role, Role>('role');
      const {code, ...newRole} = role;
      return await api.delete({ headers: authHeader }, code!);
    },

    onMutate: (variables: Role) => {
      return variables;
    },

    onSuccess: (savedRole: Role, newRole: Role) => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_ROLES],
      });
      handleSuccess?.(savedRole);
    },

    onError: (error: AxiosError, variables: Role) => {
      handleError?.(error, variables);
      return error;
    },
  });
};

export const useUpdateRoleSelector = (type: UpdateRoleType) => {
  if(type === UpdateRoleType.USER){
    return useUpdateUserRoles;
  }
  return useUpdateUserRoles;
}
