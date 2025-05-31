import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div>
      <Navbar/>
      <div className={``}>
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;