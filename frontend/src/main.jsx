import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root/Root.jsx";
import Home from './Pages/Home/Home.jsx';
import Menu from './Pages/Menus/Menu.jsx';
import Event from './Pages/Events/Event.jsx';
import Blogs from './Pages/Blogs/Blogs.jsx';
import About from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignUp from "./Pages/Signup/SignUp.jsx";
import Account from "./Pages/Account/Account.jsx";
import Product from "./Pages/Product/Product.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import SignOut from "./Pages/SignOut/SignOut.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { CategoryProvider } from "./Context/CategoryContext.jsx";
import FoodAddForm from "./dashboard/Dash-components/FoodAddForm.jsx";
import DashboardHome from "./dashboard/DashboardHome.jsx";
import FoodsProvider from "./Context/FoodsContext.jsx";
import EditFoods from "./dashboard/Dash-components/EditFoods.jsx";
import EditFood from "./dashboard/Dash-pages/EditFood.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import ThankYou from "./components/Aditionals/ThankYou.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";
import Unauthorized from "./components/Aditionals/Unauthorized.jsx";
import AdminRoute from "./ProtectedRoute/AdminRoute.jsx";
import { ReviewProvider } from "./Context/ReviewContext.jsx";
import FoodBySearch from "./components/Search/FoodBySearch.jsx";
import OrderInfos from "./dashboard/Dash-pages/OrderInfos.jsx";
import NotFound from "./components/Aditionals/NotFound.jsx";
import ErrorBoundary from "./components/Aditionals/ErrorBoundary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />, // Add error boundary
    children: [
      { index: true, element: <Home /> },
      { path: 'menus', element: <Menu /> },
      { path: 'events', element: <Event /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'about_us', element: <About /> },
      { path: 'contact_us', element: <Contact /> },
      { path: 'search/:productName', element: <FoodBySearch /> },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        )
      },
      { path: 'product/:id', element: <Product /> },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: 'thank-you',
        element: (
          <ProtectedRoute>
            <ThankYou />
          </ProtectedRoute>
        )
      }
    ]
  },
  { path: 'sign_in', element: <SignIn /> },
  { path: 'sign_up', element: <SignUp /> },
  { path: 'sign_out', element: <SignOut /> },
  { path: 'unauthorized', element: <Unauthorized /> },
  {
    path: 'admin-dashboard',
    element: <AdminRoute />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'add-foods', element: <FoodAddForm /> },
      { path: 'edit-foods', element: <EditFoods /> },
      { path: 'order-info', element: <OrderInfos /> },
      { path: 'edit-food/:id', element: <EditFood /> }
    ]
  },
  // Redirect unknown routes to 404
  { path: '*', element: <NotFound /> }
], {
  // Router configuration
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  }
});

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <AuthProvider>
    <CategoryProvider>
      <FoodsProvider>
        <OrderProvider>
          <ReviewProvider>
            <RouterProvider router={router} />
          </ReviewProvider>
        </OrderProvider>
      </FoodsProvider>
    </CategoryProvider>
  </AuthProvider>
);