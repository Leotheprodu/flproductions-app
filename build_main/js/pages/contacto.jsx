import { useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {FormulariodeContacto} from '../components';
export function ContactPage () {
  

  return(

    <>
      <HelmetProvider>
      <Helmet>
        <title>FLProductions | Contacto</title>
        <meta name="description" content="Información de contacto de los estudios de FLProductions Costa Rica." />
        <meta property="og:title" content="FLProductions | contacto" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flproductionscr.com/contacto" />
        <meta property="og:image" content="https://flproductionscr.com/build_main/img/header-main.png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
      </Helmet>


      <div className='contacto-container'>
      <h3 className="contacto__contact-form__title">Contáctenos</h3>

      <FormulariodeContacto />
      </div>


      <div className='contacto__map'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2268.886137957426!2d-83.55804507982572!3d10.131148626326205!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x572d591623657f53!2sFLProductions!5e0!3m2!1ses!2scr!4v1667294867121!5m2!1ses!2scr" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
      </HelmetProvider>

      
    </>
  )

}