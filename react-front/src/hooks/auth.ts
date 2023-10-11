import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MCRM_ACCESS_TOKEN_KEY, MCRM_REFRESH_TOKEN_KEY } from '../services/app.constants';
import useAppStore from '../store/AppStore';
import { CurrentUser } from '../store/interfaces/CurrentUser';
import { localStorageDelete } from '../utils/localStorage';

/**
 * Hook to get currently logged user
 * @returns {object | undefined} user data as object or undefined if user is not logged in
 */
export function useCurrentUser(): CurrentUser | undefined {
  const currentUser = useAppStore(s => s.currentUser);
  return currentUser;
}

/**
 * Hook to detect is current user authenticated or not
 * @returns {boolean} true if user is authenticated, false otherwise
 */
export function useIsAuthenticated() {
  const isAuth = useAppStore(s => s.isAuthenticated);

  return isAuth;
}

/**
 * Returns event handler to Logout current user
 * @returns {function} calling this event logs out current user
 */
export function useEventLogout() {
  const navigate = useNavigate();
  const store = useAppStore();

  return useCallback(() => {
    localStorageDelete();
    store.isAuthenticated = false;
    store.currentUser = undefined;
    navigate('/auth', { replace: true }); // Redirect to home page by reloading the App
  }, [store, navigate]);
}

/**
 * Adds watchdog and calls different callbacks on user login and logout
 * @param {function} afterLogin callback to call after user login
 * @param {function} afterLogout callback to call after user logout
 */
export function useAuthWatchdog(afterLogin: () => void, afterLogout: () => void) {
  const store = useAppStore();

  useEffect(() => {
    if (store.isAuthenticated) {
      afterLogin?.();
    } else {
      afterLogout?.();
    }
  }, [store.isAuthenticated, afterLogin, afterLogout]);
}

export function useAccessToken() {
  const accessToken = localStorage.getItem(MCRM_ACCESS_TOKEN_KEY);
  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { Authorization: '' };
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}

export function useRefreshToken() {
  const refreshToken = localStorage.getItem(MCRM_REFRESH_TOKEN_KEY);
  if (refreshToken) {
    return { Authorization: 'Bearer ' + refreshToken };
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { Authorization: '' };
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}
