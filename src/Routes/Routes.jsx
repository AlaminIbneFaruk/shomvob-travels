import { createBrowserRouter } from "react-router-dom";
// ... imports
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Layout from "../Layout/Layout.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import ErrorF2F from "../Pages/ErrorF2F.jsx";
import Hero from "../Components/Hero.jsx";
import Trip from "../Pages/Trip.jsx";
import Package from "../Pages/PackageDetails.jsx";
import About from "../Pages/About.jsx";
import Community from "../Pages/Community.jsx";
import ManageProfile from "../Pages/ManageProfile.jsx";
import Dashboard from "../Layout/Dashboard.jsx";
import Bookings from "../Pages/Bookings.jsx";
import BookForm from "../Pages/BookForm.jsx";
import TourGuide from "../Pages/TourGuide.jsx";
import AddStories from "../Pages/AddStories.jsx";
import ManageStories from "../Pages/ManageStories.jsx";
import TourGuideApplication from "../Pages/TourGuideApplication.jsx";
import TourGuideDashboard from "../Pages/TourGuideDashboard/TourGuideDashboard.jsx";
import ManageProfileTG from "../Pages/TourGuideDashboard/ManageProfileTG.jsx";
import AssignedTours from "../Pages/AssignedTours.jsx";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard.jsx";
import ManageProfileAdmin from "../Pages/AdminDashboard/ManageProfileAdmin.jsx";
import ManageUsers from "../Pages/ManageUsers.jsx";
import ManageTourguides from "../Pages/ManageTourguides.jsx";
import AddPackageForm from "../Pages/AdminDashboard/AddPackages.jsx";
import Choice from "../Pages/Choice.jsx";
import PackageDetails from "../Pages/PackageDetails.jsx";
import UpdateProfile from "../Pages/UpdateProfile.jsx";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorF2F />,
    children: [
      { path:"", element: <Home /> },
      { path: "guide/:id", element: <TourGuide /> },
      { path: "package-details", element: <Package /> },
      { path: "about", element: <About /> },
      { 
        path: "package-details/:id", 
        element: (
          <>
            <Hero />
            <PackageDetails />
          </>
        ),
      },
      {
        path: "book-form/:id", 
        element: (
          <>
            <Hero />
            <BookForm />
          </>
        ),
      },
      {
        path: "dashboard",
        element: <Choice />,
      },
      {
        path: "bookings/:id",
        element: <PrivateRoutes><Hero /><Bookings /></PrivateRoutes>,
      },
      { path: "login", element: <Login /> },
      { path: "community", element: <Community /> },
      { path: "register", element: <Register /> },
      { path: "trips", element: <Trip /> },
      {
        path: "user-dashboard",
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
        children: [
          { path:"", element: <ManageProfile /> },
          { path: "updateprofile/:userid", element: <UpdateProfile/> },
          { path: "my-bookings/:userid", element: <Bookings /> },
          { path: "add-stories/:userid", element: <AddStories /> },
          { path: "manage-stories/:userid", element: <ManageStories /> },
          { path: "tour-guide-application/:userid", element: <TourGuideApplication /> },
          
        ],
      },
      {
        path: "guide-dashboard",
        element: <PrivateRoutes><TourGuideDashboard /></PrivateRoutes>,
        children: [
          { path:"", element: <ManageProfileTG /> },
          { path: "updateprofile/:userid", element: <UpdateProfile/> },
          { path: "assigned-tours", element: <AssignedTours /> },
          { path: "add-stories", element: <AddStories /> },
          { path: "manage-stories/:userid", element: <ManageStories /> },
        ],
      },
      {
        path: "admin-dashboard",
        element: <PrivateRoutes><AdminDashboard /></PrivateRoutes>,
        children: [
          { path:"", element: <ManageProfileAdmin /> },
          { path: "updateprofile/:userid", element: <UpdateProfile/> },
          { path: "add-package", element: <AddPackageForm /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-candidates", element: <ManageTourguides /> },
        ],
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Routes;