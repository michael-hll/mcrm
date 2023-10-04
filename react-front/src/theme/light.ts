import { ThemeOptions } from '@mui/material';
import { PALETTE_COLORS } from './colors';

/**
 * MUI theme options for "Light Mode"
 */
export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      paper: '#e9ecef', // Gray 100 - Background of "Paper" based component
      default: '#f1f3f5',
    },
    ...PALETTE_COLORS,
  },
};

export default LIGHT_THEME;
