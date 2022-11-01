
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { HomePage, ContactPage, BlogPage, AboutPage, ServicesPage, Root, ErrorPage } from './pages';
import '../css/app.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


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
      /* {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "servicios",
        element: <ServicesPage />,
      }, */
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