
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import '../css/app.css';
import { HomePage } from './pages/inicio';
import { ContactPage } from './pages/contacto';
import { BlogPage } from "./pages/blog";
import { AboutPage } from "./pages/nosotros";
import { ServicesPage } from "./pages/servicios";
import { Root } from "./pages/Root";
import ErrorPage from "./pages/error-page";
/* import { Root2 } from "./pages/root2"; */



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "contacto",
        element: <ContactPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "servicios",
        element: <ServicesPage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
    ],
  },
  
 /*  {
    path: "/",
    element: <Root2 />,

    children: [
      
    ],
  }, */
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);