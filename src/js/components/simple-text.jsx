import propTypes from 'prop-types';
import {useRef, useEffect} from 'react';





export function SimpleText({titulo,texto,fxElement,tipo}) {

    const ref = useRef(null);
    
    useEffect(() => {
      const el1 = ref.current;
      
      function mostrarScroll(){
        let scrollTop = document.documentElement.scrollTop
        let alturaAnimado = el1.offsetTop;
        if (alturaAnimado - 600 < scrollTop) {
          el1.style.opacity = 1;
          if(tipo !== 1 && fxElement === 'fxElement') {
            el1.classList.add('fxMostrarArriba')
          }
          
        }
        
      }
    
      
      window.addEventListener('scroll',mostrarScroll);
      
    },[]);
    
  if(tipo===1) {
    return(

      <div className={'simple-text_info'}>
        <h1>{titulo}</h1>

        <p>{texto}</p>
      </div>
    );

  }else if(tipo===2) {
    
    return(

    
      <div /* onScroll={mostrarScroll} */ ref={ref} className={'simple-text_info'+' '+fxElement}>
        <h3>{titulo}</h3>

        <p>{texto}</p>
      </div>
    );
  };


};


SimpleText.propTypes = {
    
  titulo: propTypes.string.isRequired,
  tipo: propTypes.number.isRequired, //1: contiene un h1 y 2: contiene un h3
  texto: propTypes.string.isRequired,
  fxElement: propTypes.string,
  
}
SimpleText.defaultProps = {

  tipo: 2,

}