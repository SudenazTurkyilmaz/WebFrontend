import { Toaster } from "sonner";
import UserLayout from "./components/Layouts/UserLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/Auth/Login";
import LoggedInInfoContextProvider from "./components/Contexts/LoggedInInfoContex";
import AnonymousLayout from "./components/Layouts/AnonymousLayout";
import CarList from "./components/Cars/CarList";
import CategoryList from "./components/Categories/CategoryList";
import ServiceList from "./components/Services/ServiceList";

import RegisterPage from "./components/Auth/Register";

function App() {
  const router = createBrowserRouter([
    {
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <h1>HomePage</h1>,
          errorElement: <p>Sayfa Yok</p>,
        },
        {
          path: "/Cars",
          element: <CarList />,
        },
        {
          path: "/Categories",
          element: <CategoryList />,
        },
        {
          path: "/Services",
          element: <ServiceList />,
        },
       
      ],
    },
    {
      element: <AnonymousLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register", // Yeni route tanımı
          element: <RegisterPage />, // Yeni bileşeni burada tanımlayın
        },
      ],
    },
  ]);
  return (
    <>
      <LoggedInInfoContextProvider>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
      </LoggedInInfoContextProvider>
    </>
  );
}

export default App;
