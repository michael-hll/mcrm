import { User } from "./User";

export interface Store {
  isAuthenticated: boolean;
  darkMode: boolean;
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  set: (store: Partial<Store>) => void;
}