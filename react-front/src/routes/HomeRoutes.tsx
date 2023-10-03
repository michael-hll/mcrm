import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import AuthRoutes from "../views/auth";

const HomeRoutes = () => {
  return (
    
      <DefaultLayout>
        <Routes>
          <Route path='/' element={<h1>Welcome</h1>} />
          <Route path='/auth/*' element={<AuthRoutes />} />
        </Routes>
      </DefaultLayout>
    
  );
};

export default HomeRoutes;