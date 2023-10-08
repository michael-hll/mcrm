import { Route, Routes } from 'react-router-dom';
import RolesView from './RolesView';

/**
 * Routes for "User" flow
 * url: /user/*
 */
const RoleRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<RolesView />} /> 
    </Routes>
  );
};

export default RoleRoutes;
