import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";

const HomeRoutes = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path='/' element={<h1>Welcome</h1>} />
          <Route path='/sign-in' element={<h1>Sign-In</h1>} />
          <Route path='/sign-up' element={<h1>Sign-Up</h1>} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default HomeRoutes;