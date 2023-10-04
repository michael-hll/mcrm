import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Store } from './interfaces/Store';

const useAppStore = createWithEqualityFn<Store>(set => ({
  isAuthenticated: false,
  darkMode: true,
  currentUser: undefined,
  setCurrentUser: (user) => {
    set(store => ({currentUser: user}));
  },
  setIsAuthenticated: (isAuthenticated) => {
    set(store => ({isAuthenticated}));
  },
  setDarkMode: (isDarkMode) => {
    set(store => ({darkMode: isDarkMode}));
  },
  set: (newStore) => {
    set(store => ({...newStore}));
  },  
}), shallow);

if(process.env.NODE_ENV === 'development')
  mountStoreDevtool('App Store', useAppStore);

export default useAppStore;