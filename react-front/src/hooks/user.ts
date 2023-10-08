import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccessToken } from "./auth";
import { User } from "../store/interfaces/User";
import ApiClient from "../services/apiClient";
import useAppStore from "../store/AppStore";
import { MCRM_QUERY_CURRENT_USER } from "../services/app.constants";
import { CurrentUser } from "../store/interfaces/CurrentUser";

export const useUser = (currentUser: CurrentUser | undefined,
    handleSuccess? : (data: User) => void, 
    handleError? : (error: Error) => void) => {

  const authorizationHeader = useAccessToken();

  const fetchUser = () => {
    if(!currentUser){
      throw new Error(`Current user doesn't exist.`);
    }
    const api = new ApiClient<User>('user');
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

export const useUpdateUser = (
  handleSuccess?: (user: User) => void, 
  handleError?: (error: Error) => void) => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();
  const currentUser = useAppStore(s => s.currentUser);

  return useMutation({

    mutationFn: async (user: User) => {
      const api = new ApiClient<User>('user');
      if (currentUser) {
        return await api.patch({ headers: authHeader }, user, currentUser.id);
      }
      else{
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





