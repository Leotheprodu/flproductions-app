import { Helmet, HelmetProvider } from 'react-helmet-async';

export function ContactPage () {

  return(

    <>
      <HelmetProvider>
      <Helmet>
        <title>FLProductions | Contacto</title>
        <meta name="description" content="Información de contacto de los estudios de FLProductions Costa Rica." />
      </Helmet>
      <div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, nulla. Quaerat quod earum delectus ab facilis nesciunt, rem nihil, incidunt unde suscipit dolorem possimus repellendus consequatur praesentium ea ipsam repellat!</p>
        
      </div>

      </HelmetProvider>

      
    </>
  )

}