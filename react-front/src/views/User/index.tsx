import { Route, Routes } from 'react-router-dom';
import UserProfileView from './UserProfileView';

/**
 * Routes for "User" flow
 * url: /user/*
 */
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<UserProfileView />} /> 
    </Routes>
  );
};

export default UserRoutes;
