
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import { HomePage } from './pages/inicio';
import { ContactPage } from './pages/contacto';
import { BlogPage } from "./pages/blog";
import { AboutPage } from "./pages/nosotros";
import { ServicesPage } from "./pages/servicios";

import '../css/app.css';

const router = createBrowserRouter([
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
    path: "nosotros",
    element: <AboutPage />,
  },
  {
    path: "servicios",
    element: <ServicesPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);