import { Helmet, HelmetProvider } from 'react-helmet-async';

export function BlogPage () {

  return(

    <>
      <HelmetProvider>

        <Helmet>
          <title>FLProductions | Blog</title>
          <meta name="description" content="El blog oficial de FLProductions, el estudio de grabación y producción musical de Costa Rica" />
        </Helmet>
        <div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, nulla. Quaerat quod earum delectus ab facilis nesciunt, rem nihil, incidunt unde suscipit dolorem possimus repellendus consequatur praesentium ea ipsam repellat!</p>
          
        </div>
      </HelmetProvider>
  
    </>
  )

}