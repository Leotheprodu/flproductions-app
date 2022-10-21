import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRouteError } from "react-router-dom";


export default function ErrorPage() {

  const error = useRouteError();
  console.error(error);
 /*  useEffect(() => { document.body.style.backgroundColor = '#1ab5e6' }, []) */
  return (
    <div className='error-page contenedor'>
      <Helmet>
        <title>FLProductions | Error</title>
      </Helmet>
      <h1>¡Oops!</h1>
      <h2>Parece que la Página no existe</h2>
      <div className='error-page__redirigir'>

        <p className=''>En <span>10</span> segundos te llevaremos a la página de Inicio</p>
        <p>o</p>
        
        <button>Click Aqui y Contáctanos</button>


      </div>
      <p>
        <i>{error.status || error.message}</i>
      </p>
    </div>
  );
}