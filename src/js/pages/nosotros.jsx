import React from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export function AboutPage () {

  return(

    <React.StrictMode>
  
      <Header imgName="Portada-pagina-leotheprodu.webp" pagina="nosotros"/>
  
      <div className='contenedor'>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo, nulla. Quaerat quod earum delectus ab facilis nesciunt, rem nihil, incidunt unde suscipit dolorem possimus repellendus consequatur praesentium ea ipsam repellat!</p>
        
      </div>
      
      <Footer/>
      
    </React.StrictMode>
  )

}