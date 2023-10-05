import { useCallback } from 'react';
import useAppStore from '../store/AppStore';
import { MCRM_DARK_MODE } from '../services/app.constants';
/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {
  let state = useAppStore();
  

  return useCallback(() => {    
    state.setDarkMode(!state.darkMode);
    localStorage.setItem(MCRM_DARK_MODE, state.darkMode.toString());
  }, [state]); 
}
