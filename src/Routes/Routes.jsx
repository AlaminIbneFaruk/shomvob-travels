import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Layout from "../Layout/Layout.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import ErrorF2F from "../Pages/ErrorF2F.jsx";
import Hero from "../Components/Hero.jsx";
import Trip from "../Pages/Trip.jsx";
import Package from "../Pages/Package.jsx";
import About from "../Pages/About.jsx";
import Community from "../Pages/Community.jsx";
import ManageProfile from "../Pages/ManageProfile.jsx";
import Tourist from "../Pages/Tourist.jsx";
import Dashboard from "../Layout/Dashboard.jsx";
import Bookings from "../Pages/Bookings.jsx";
import TourGuide from "../Pages/TourGuide.jsx";
import AddStories from "../Pages/AddStories.jsx";
import ManageStories from "../Pages/ManageStories.jsx";
import TourGuideApplication from "../Pages/TourGuideApplication.jsx";
import TourGuideDashboard from "../Pages/TourGuideDashboard/TourGuideDashboard.jsx";
import ManageProfileTG from "../Pages/TourGuideDashboard/ManageProfileTG.jsx";
import AssignedTours from "../Pages/AssignedTours.jsx";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard.jsx";
import ManageProfileAdmin from "../Pages/AdminDashboard/ManageProfileAdmin.jsx";
import AddPackageForm from "../Pages/AdminDashboard/AddPackages.jsx";
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
        path: "/guide/:id",
        element: <TourGuide/>,
      },
      {
        path: "/package-details/:id",
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
        path: "/dashboard/",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "tourist/",
            element: <Tourist />,
            children: [
              {
                path: "",
                element: <ManageProfile />,
              },
              {
                path: "my-bookings/:userid",
                element: <Bookings />,
              },
              {
                path: "add-stories/:userid",
                element: <AddStories />,
              },
              {
                path: "manage-stories/:userid",
                element: <ManageStories />,
              },
              {
                path: "tour-guide-application/:userid",
                element: <TourGuideApplication />,
              },
            ],
          },
        ],
      },
      {
        path: "tourguidedashboard/",
        element: <TourGuideDashboard />,
        children: [
          {
            path: "",
            element: <ManageProfileTG />,
          },
          {
            path: "assignedtours",
            element: <AssignedTours />,
          },
          {
            path: "add-stories",
            element: <AddStories />,
          },              {
                path: "manage-stories/:userid",
                element: <ManageStories />,
              },
        ],
      },
      {
        path: "admin",
        element: (
          <AdminDashboard></AdminDashboard>
        ),
        children:[
          {
            path: "",
            element: <ManageProfileAdmin />,
          },
          {
            path: "add-package",
            element: <AddPackageForm />,
          },
        ]
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
