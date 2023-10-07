import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccessToken } from "./auth";
import { User } from "../store/interfaces/User";
import ApiClient from "../services/apiClient";
import useAppStore from "../store/AppStore";
import { MCRM_QUERY_CURRENT_USER, MCRM_QUERY_KEY_USERS } from "../services/app.constants";

export const useUser = (currentUserId: number) => {

  const authorizationHeader = useAccessToken();

  const fetchUser = () => {
    const api = new ApiClient<User>('user');
    return api.getOne({ headers: authorizationHeader }, currentUserId);
  }

  return useQuery<User, Error>({
    queryKey: [MCRM_QUERY_CURRENT_USER],
    queryFn: fetchUser,
    staleTime: Infinity,
    cacheTime: 0,
    keepPreviousData: true, // only data is back then refresh notice the observers
    onError: (error: Error) => {
      console.log(error);
      return error;
    },
    onSuccess: (data: User) => {
      console.log('success', data);
    }
  });
};


export const useUpdateUser = () => {
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
      })
    },

    onError: (error: Error, variables: User) => {
      return error;
    },
  });
};





