import { Outlet, useLocation } from "react-router-dom";
import NavBar from '../components/NavBar';

const MainLayout = () => {
  
  return (
    <div className="relative">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
