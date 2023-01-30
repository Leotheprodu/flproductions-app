
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { HomePage, ContactPage, Musica, AboutPage, ServicesPage, Root, ErrorPage } from './pages';
import '../css/app.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export const router = createBrowserRouter([
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
      }, */
      {
        path: "musica",
        element: <Musica />,
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
