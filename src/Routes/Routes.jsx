import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ErrorPage from "../Pages/ErrorPages/ErrorPage.jsx";
import Layout from "../Layout/Layout.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import ErrorF2F from "../Pages/ErrorF2F/ErrorF2F.jsx";
import Hero from "../Components/Hero.jsx";
import Trip from "../Pages/Trip/Trip.jsx";
import Package from "../Pages/Package/Package.jsx";
import About from "../Pages/About/About.jsx";
import Community from "../Pages/Community/Community.jsx";
import ManageProfile from "../Pages/ManageProfile/ManageProfile.jsx";
import Tourist from "../Pages/Tourist/Tourist.jsx";
import Dashboard from "../Layout/Dashboard.jsx";
import Bookings from"../Pages/MyBookings/Bookings.jsx";
import AddStories from"../Pages/AddStories/AddStories.jsx";
import ManageStories from"../Pages/ManageStories/ManageStories.jsx";
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
        path: "/package-details",
        element: <Package />,
        errorElement: <ErrorF2F />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <ErrorF2F />,
      },
      {
        path: "/packagedetails/:id",
        element: (
          <>
            <Hero />
            packagedetails
          </>
        ),
      },
      {
        path: "/dashboard/:userid",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "", 
            element: (
              <>
                <Tourist/>
              </>
            ),
            children:[
              { 
                path:"manage-profiles/:userid",
                element:<ManageProfile/>
              },
              { 
                path:"my-bookings/:userid",
                element:<Bookings/>
              },
              { 
                path:"add-stories/:userid",
                element:<AddStories/>
              }
              ,
              { 
                path:"manage-stories/:userid",
                element:<ManageStories/>
              }
            ]
          },
          {
            path: "tourguide/:tourguideid",
            element: (
              <>
                <Hero />
                tourguidedashboard
              </>
            ),
          },
          {
            path: "admin/:adminid", 
            element: (
              <>
                <Hero />
                admindashboard
              </>
            ),
          },
        ],
      },
      {
        path: "/bookings/:id",
        element: (
          <PrivateRoutes>
            <>
              <Hero />
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
        element: <Community />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/trips",
        element: <Trip />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Routes;
