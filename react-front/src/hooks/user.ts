import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccessToken } from "./auth";
import { UpdateUserRoles, User } from "../store/interfaces/User";
import ApiClient from "../services/apiClient";
import useAppStore from "../store/AppStore";
import { MCRM_QUERY_CURRENT_USER, MCRM_QUERY_USER_ROLES } from "../services/app.constants";
import { CurrentUser } from "../store/interfaces/CurrentUser";
import { AddRemoveRoles } from "../store/interfaces/AddRemoveRoles";

export const useUser = (currentUser: CurrentUser | undefined,
  handleSuccess?: (data: User) => void,
  handleError?: (error: Error) => void) => {

  const authorizationHeader = useAccessToken();

  const fetchUser = () => {
    if (!currentUser) {
      throw new Error(`Current user doesn't exist.`);
    }
    const api = new ApiClient<User, User>('user');
    return api.getOne({ headers: authorizationHeader }, currentUser.id);
  }

  return useQuery<User, Error>({
    queryKey: [MCRM_QUERY_CURRENT_USER],
    queryFn: fetchUser,
    enabled: currentUser !== undefined,
    staleTime: Infinity,
    cacheTime: 0,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error: Error) => {
      handleError?.(error);
      return error;
    },
    onSuccess: (data: User) => {
      handleSuccess?.(data);
    }
  });
};

export const useUserRoles = (
  handleSuccess?: (data: User[]) => void,
  handleError?: (error: Error) => void) => {

  const authorizationHeader = useAccessToken();

  const fetchUserRoles = () => {
    const api = new ApiClient<User, User>('user');
    return api.getAll({ headers: authorizationHeader });
  }

  return useQuery<User[], Error>({
    queryKey: [MCRM_QUERY_USER_ROLES],
    queryFn: fetchUserRoles,
    staleTime: Infinity,
    cacheTime: 0,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error: Error) => {
      handleError?.(error);
      return error;
    },
    onSuccess: (data: User[]) => {
      handleSuccess?.(data);
    }
  });
};

export const useUpdateUser = (
  handleSuccess?: (user: User) => void,
  handleError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();
  const currentUser = useAppStore(s => s.currentUser);

  return useMutation({

    mutationFn: async (user: User) => {
      const {id, ...updateUser} = user;
      const api = new ApiClient<User, User>('user');
      if (currentUser) {
        return await api.patch({ headers: authHeader }, updateUser, currentUser.id);
      }
      else {
        throw new Error(`Current user doesn't exist.`);
      }
    },

    onMutate: (variables: User) => {
      return variables;
    },

    onSuccess: (savedUser: User, newUser: User) => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_CURRENT_USER],
      });
      handleSuccess?.(savedUser);
    },

    onError: (error: Error, variables: User) => {
      handleError?.(error);
      return error;
    },
  });
};

export const useUpdateUserRoles = (
  handleSuccess?: () => void,
  handleError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();

  return useMutation<boolean, Error, UpdateUserRoles, UpdateUserRoles>({

    mutationFn: async (updateRoles: UpdateUserRoles) => {
      const api = new ApiClient<{roles: AddRemoveRoles[]}, boolean>('user/roles');
      return await api.patch({ headers: authHeader }, updateRoles.roles, updateRoles.id);
    },
    
    onMutate: (variables: UpdateUserRoles) => {
      return variables;
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_USER_ROLES],
      });
      handleSuccess?.();
    },

    onError: (error: Error, variables: UpdateUserRoles) => {
      handleError?.(error);
      return error;
    },
  });
};





