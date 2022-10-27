import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react';

export function PalabrasDelEquipo({titulo, texto, nombre, puesto, foto, firma}) {

  const ref = useRef(null);

    useEffect(() => {
      const ElementWithFX = ref.current;
      

      function mostrarScroll(){
        const scrollTop = document.documentElement.scrollTop;
        const alturaElemento = ElementWithFX.offsetTop;

        if (alturaElemento - 200 < scrollTop) {
          ElementWithFX.style.opacity = 1;
          ElementWithFX.classList.add('fxMostrarArriba');
          
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
      <div ref={ref} className='palabras-del-equipo fxElement'>
        <div className='palabras-del-equipo_foto'>

          <img src={foto} alt={nombre} />

        </div>
        <div className='contenedor'>
          <h4>{titulo}</h4>
          <p className='palabras-del-equipo_parrafo-principal'>{texto}</p>

          <div className='palabras-del-equipo_firma'>
            <img className='palabras-del-equipo_firma-firma' src={firma} alt={nombre+" firma"} />
            <div>
              <p>{nombre}</p>

              <p className='palabras-del-equipo_firma_titulo'>{puesto}</p>
            </div>
          </div>
        </div>

      </div>



    )
}

PalabrasDelEquipo.propTypes = {
    
  titulo: PropTypes.string,
  texto: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  puesto: PropTypes.string.isRequired,
  foto: PropTypes.string.isRequired,
  firma: PropTypes.string,
  
}