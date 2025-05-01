import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className='relative'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
