import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import AuthRoutes from "../views/auth";
import useAppStore from "../store/AppStore";
import SignInView from "../views/auth/SignInView";

const HomeRoutes = () => {
  const hasLogin = useAppStore(s => s.isAuthenticated)
  return (
    
    <DefaultLayout>
      <Routes>
        <Route path='/' element={
          hasLogin ? <DefaultLayout /> : <SignInView />
        } />
        <Route path='/auth/*' element={<AuthRoutes />} />
      </Routes>
    </DefaultLayout>

  );
};

export default HomeRoutes;