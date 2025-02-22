import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ErrorPage from "../Pages/ErrorPages/ErrorPage.jsx";
import Layout from "../Layout/Layout.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import ErrorF2F from "../Pages/ErrorF2F/ErrorF2F.jsx";
import Hero from "../Pages/Home/Hero.jsx";

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
        element: <>tourism packages</>,
        errorElement: (
          <>
            <ErrorF2F></ErrorF2F>
          </>
        ),
      },
      {
        path: "/about",
        element: <>About US</>,
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
          <div>
            <Hero></Hero>
            Communities
          </div>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Routes;
