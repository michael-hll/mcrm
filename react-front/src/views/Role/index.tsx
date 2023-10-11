import { Route, Routes } from 'react-router-dom';
import RolesView from './RolesView';
import UserRolesView from './UserRolesView';
import ApiRolesView from './ApiRolesView';

/**
 * Routes for "User" flow
 * url: /user/*
 */
const RoleRoutes = () => {
  return (
    <Routes>
      <Route path='/user//*' element={<UserRolesView />} />
      <Route path='/api//*' element={<ApiRolesView />} />
      <Route path="*" element={<RolesView />} /> 
    </Routes>
  );
};

export default RoleRoutes;
