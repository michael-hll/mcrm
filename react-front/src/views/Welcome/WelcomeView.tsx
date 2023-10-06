import { Typography } from '@mui/material';
import AppView from '../../components/AppView/AppView';
import AppLink from '../../components/AppLink/AppLink';

/**
 * Renders "Welcome" view
 * url: /
 * @page Welcome
 */
const WelcomeView = () => {
  return (
    <AppView>
      <Typography variant="h4">Welcome to React App with MUI</Typography>

    </AppView>
  );
};

export default WelcomeView;
