import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccessToken } from "./auth";
import { User } from "../store/interfaces/User";
import ApiClient from "../services/apiClient";
import useAppStore from "../store/AppStore";
import { MCRM_QUERY_CURRENT_USER, MCRM_QUERY_KEY_USERS } from "../services/app.constants";

export const useUsers = () => {

  const authorizationHeader = useAccessToken();

  const fetchUsers = () => {
    const api = new ApiClient<User>('user');
    return api.getAll({ headers: authorizationHeader })
  }

  return useQuery<User[], Error>({
    queryKey: [MCRM_QUERY_KEY_USERS], 
    queryFn: fetchUsers,
    staleTime: 10 * 1000,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error) => {
      console.log(error);
      return error.message;
    },
    onSuccess: (data) => {
      console.log('success', data);
    }
  });
};

export const useUser = (currentUserId: number) => {

  const authorizationHeader = useAccessToken();

  const fetchUser = () => {
    const api = new ApiClient<User>('user');
    return api.getOne({ headers: authorizationHeader }, currentUserId);
  }

  return useQuery<User, Error>({
    queryKey: [MCRM_QUERY_CURRENT_USER],
    queryFn: fetchUser,
    staleTime: 10 * 1000,
    cacheTime: 0,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error: Error) => {
      console.log(error);
      return error.message;
    },
    onSuccess: (data: User) => {
      console.log('success', data);
    }
  });
};

interface UpdateUserContext {
  previousUser: User;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const authHeader = useAccessToken();
  const currentUser = useAppStore(s => s.currentUser);

  return useMutation<Partial<User>, Error, Partial<User>, UpdateUserContext>({

    mutationFn: async (user: Partial<User>) => {
      const api = new ApiClient<Partial<User>>('user');
      if(currentUser){
        return await api.patch({ headers: authHeader }, user, currentUser.id);
      }else{
        return Promise.reject();
      }
    },

    onSuccess: (savedUser: Partial<User>, newUser: Partial<User>) => {
      queryClient.invalidateQueries({
        queryKey: [MCRM_QUERY_CURRENT_USER],
      })
    },
  });
};
