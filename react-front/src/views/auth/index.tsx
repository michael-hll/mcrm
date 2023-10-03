import { Route, Routes } from 'react-router-dom';

import SignInView from './SignInView';
import NotFoundView from '../NotFoundView';
import SignUpView from './SignUpView';

/**
 * Routes for "Auth" flow
 * url: /auth/*
 */
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInView />} />
      <Route path="/login" element={<SignInView />} />
      <Route path="/signup/*" element={<SignUpView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default AuthRoutes;
