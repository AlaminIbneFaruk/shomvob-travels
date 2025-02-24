import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ErrorPage from "../Pages/ErrorPages/ErrorPage.jsx";
import Layout from "../Layout/Layout.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import ErrorF2F from "../Pages/ErrorF2F/ErrorF2F.jsx";
import Hero from "../Pages/Home/Hero.jsx";
import Trip from "../Pages/Trip/Trip.jsx";
import Package from "../Pages/Package/Package.jsx";
import About from "../Pages/About/About.jsx";
import Community from "../Pages/Community/Community.jsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/toursimpackages",
        element: <Package></Package>,
        errorElement: (
          <>
            <ErrorF2F></ErrorF2F>
          </>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
        errorElement: (
          <>
            <ErrorF2F></ErrorF2F>
          </>
        ),
      },
      {
        path: "/packagedetails/:id",
        element: (
          <>
            <Hero></Hero>
            packagedetails
          </>
        ),
      },
      {
        path: "/userdashboard/:userid",
        element: (
          <PrivateRoutes>
            <>
              <Hero></Hero>
              userdashboard
            </>
          </PrivateRoutes>
        ),
      },
      {
        path: "/tourguidedashboard/:userid",
        element: (
          <PrivateRoutes>
            <>
              <Hero></Hero>
              tourguidedashboard
            </>
          </PrivateRoutes>
        ),
      },
      {
        path: "/admindashboard",
        element: (
          <PrivateRoutes>
            <>
              <Hero></Hero>
              admindashboard
            </>
          </PrivateRoutes>
        ),
      },
      {
        path: "/bookings/:id",
        element: (
          <PrivateRoutes>
            <>
              <Hero></Hero>
              bookings
            </>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/community",
        element: (
          <Community/>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/trips",
        element: <Trip/>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Routes;
