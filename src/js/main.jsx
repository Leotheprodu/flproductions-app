
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, ContactPage, Canciones, AboutPage, Instrumentales, Root, ErrorPage, ControlPanel } from './pages';
import '../../build_main/css/app.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SongDetail, ArtistDetail, InstrumentalDetail, ProducerDetail, SignUp, Login, UserPerfil } from "./components";




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
        path: "cancion/:id",
        element: <SongDetail />,

      },
      {
        path: "artista/:artist_name",
        element: <ArtistDetail />,

      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "instrumentales",
        element: <Instrumentales />,
      },
      {
        path: "instrumental/:id",
        element: <InstrumentalDetail />,

      },
      {
        path: "productor-musical/:artist_name",
        element: <ProducerDetail />,

      },
      {
        path: "registro-de-usuario",
        element: <SignUp />,

      },
      {
        path: "iniciar-sesion",
        element: <Login />,

      },
      {
        path: "panel-de-control",
        element: <ControlPanel />,
        children: [
          {
            path: "Perfil-de-usuario",
            element: <UserPerfil />,
          }
        ]
      }
    ]
  }

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
