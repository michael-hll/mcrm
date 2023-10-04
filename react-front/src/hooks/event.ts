import { useCallback } from 'react';
import useAppStore from '../store/AppStore';
/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {
  const store = useAppStore();

  return useCallback(() => {
    /*
    dispatch({
      type: 'DARK_MODE',
      payload: !state.darkMode,
    });*/
  }, [store]); 
}
