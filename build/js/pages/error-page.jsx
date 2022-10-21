import { useEffect } from 'react';
/* import { Helmet } from 'react-helmet'; */
import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
  
  
  const error = useRouteError();
  console.error(error);
  useEffect(() => { document.body.style.backgroundColor = '#1ab5e6' }, [])
  return (
    <div className='error-page contenedor'>
      {/* <Helmet>
        <title>FLProductions | Error</title>
      </Helmet> */}
      <div className='error-page__errorType-padre'>
      <p className='error-page__errorType'>
          <i>{error.status || error.message}</i>
        </p>
      </div>
      <h1>¡Oops!</h1>
      
      <h2>Parece que este enlace no existe</h2>
      <div className='error-page__redirigir'>

        <p className='error-page__redirigir__text'>Te recomendamos ir a la página principal</p>
        <a href="/">
          <div className='error-page__redirigir__button'>
            Ir
          </div>
        </a>
        

      </div>
      
      
    </div>
  );
  
}