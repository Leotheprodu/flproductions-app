import { useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {FormulariodeContacto} from '../components';
export function ContactPage () {
  const ref = useRef(null);

  useEffect(() => {
    const ElementWithFX = ref.current;
    

    function mostrarScroll(){
      const scrollTop = document.documentElement.scrollTop;
      const alturaElemento = ElementWithFX.offsetTop;

      if (alturaElemento - 200 < scrollTop) {
        ElementWithFX.style.opacity = 1;
        ElementWithFX.classList.add('fxMostrarSkew');
        
      }
    }     
    if (ElementWithFX !== null){
      document.addEventListener('scroll',mostrarScroll);
    }
    
    return () => {
      document.removeEventListener('scroll',mostrarScroll);
    }

    
  },[]);

  return(

    <>
      <HelmetProvider>
      <Helmet>
        <title>FLProductions | Contacto</title>
        <meta name="description" content="Información de contacto de los estudios de FLProductions Costa Rica." />
      </Helmet>


      <div className='contacto-container'>
      <h3 className="contacto__contact-form__title">Contáctenos</h3>

      <FormulariodeContacto />
      </div>


      <div ref={ref} className='contacto__map fxElement'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2268.886137957426!2d-83.55804507982572!3d10.131148626326205!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x572d591623657f53!2sFLProductions!5e0!3m2!1ses!2scr!4v1667294867121!5m2!1ses!2scr" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
      </HelmetProvider>

      
    </>
  )

}