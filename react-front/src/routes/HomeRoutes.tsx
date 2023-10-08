import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import AuthRoutes from "../views/Auth";
import useAppStore from "../store/AppStore";
import UserRoutes from "../views/User";
import WelcomeView from "../views/Welcome";
import RoleRoutes from "../views/Role";

const HomeRoutes = () => {
  const hasLogin = useAppStore(s => s.isAuthenticated)
  return (
    
    <DefaultLayout>
      <Routes>
        <Route path='/' element={
          hasLogin ? <WelcomeView /> : <AuthRoutes />
        } />
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route path='/user//*' element={<UserRoutes />} />
        <Route path='/role//*' element={<RoleRoutes />} />
      </Routes>
    </DefaultLayout>

  );
};

export default HomeRoutes;