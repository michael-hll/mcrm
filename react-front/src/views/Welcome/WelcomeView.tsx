import { Typography } from '@mui/material';
import AppView from '../../components/AppView/AppView';
import AppLink from '../../components/AppLink/AppLink';
import useAppStore from '../../store/AppStore';
import React from 'react';
import { RefreshCheck } from '../../utils/localStorage';

/**
 * Renders "Welcome" view
 * url: /
 * @page Welcome
 */
const WelcomeView = () => {
    return (
    <AppView>
      <Typography variant="h4">Welcome to MCRM !</Typography>

    </AppView>
  );
};

export default WelcomeView;
