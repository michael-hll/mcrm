import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import AuthRoutes from "../views/auth";

const HomeRoutes = () => {
  return (
    
      <DefaultLayout>
        <Routes>
          <Route path='/' element={<DefaultLayout />} />
          <Route path='/auth/*' element={<AuthRoutes />} />
        </Routes>
      </DefaultLayout>
    
  );
};

export default HomeRoutes;