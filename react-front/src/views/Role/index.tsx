import { Route, Routes } from 'react-router-dom';
import RolesView from './RolesView';
import UserRolesView from './UserRolesView';

/**
 * Routes for "User" flow
 * url: /user/*
 */
const RoleRoutes = () => {
  return (
    <Routes>
      <Route path='/user//*' element={<UserRolesView />} />
      <Route path="*" element={<RolesView />} /> 
    </Routes>
  );
};

export default RoleRoutes;
