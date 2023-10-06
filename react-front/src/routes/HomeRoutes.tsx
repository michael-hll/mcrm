import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import AuthRoutes from "../views/Auth";
import useAppStore from "../store/AppStore";
import UserRoutes from "../views/User";
import WelcomeView from "../views/Welcome";

const HomeRoutes = () => {
  const hasLogin = useAppStore(s => s.isAuthenticated)
  return (
    
    <DefaultLayout>
      <Routes>
        <Route path='/' element={
          hasLogin ? <WelcomeView /> : <AuthRoutes />
        } />
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route path='/user/' element={<UserRoutes />} />
      </Routes>
    </DefaultLayout>

  );
};

export default HomeRoutes;