import React from 'react';
import HomeRoutes from './routes/HomeRoutes';
import { AppThemeProvider } from './theme';


function App() {
  return (
    <AppThemeProvider>
      <HomeRoutes />
    </AppThemeProvider>
  );
}

export default App;
