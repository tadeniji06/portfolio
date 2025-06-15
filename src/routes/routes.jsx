import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Blogs from "../screens/Blogs";
import MainLayout from "../layout/MainLayout";
import Blog from "../components/Blog";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<Blog />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
