
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { HomePage, ContactPage, Canciones, AboutPage, ServicesPage, Root, ErrorPage } from './pages';
import '../css/app.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SongDetail } from "./components";
import { ArtistDetail } from "./components";


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
      {
        path: "canciones",
        element: <Canciones />,
      },
      {
        path: "/canciones/:id",
        element: <SongDetail />,

      },
      {
        path: "/artistas/:artist_name",
        element: <ArtistDetail />,

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
