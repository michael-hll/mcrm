import { CurrentUser } from "./CurrentUser";

export interface Store {
  isAuthenticated: boolean;
  darkMode: boolean;
  currentUser: CurrentUser | undefined;
  setCurrentUser: (user: CurrentUser) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  set: (store: Partial<Store>) => void;
}