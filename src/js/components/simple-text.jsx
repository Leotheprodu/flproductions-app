import PropTypes from 'prop-types';
import {useRef, useEffect} from 'react';

export function SimpleText({titulo,texto,tipo}) {

    const ref = useRef(null);

    useEffect(() => {
      const ElementWithFX = ref.current;
      

      function mostrarScroll(){
        const scrollTop = document.documentElement.scrollTop;
        const alturaElemento = ElementWithFX.offsetTop;

        if (alturaElemento - 200 < scrollTop) {
          ElementWithFX.style.opacity = 1;
          ElementWithFX.classList.add('fxMostrarIzquierda');
          
        }
      }     
      if (ElementWithFX !== null){
        document.addEventListener('scroll',mostrarScroll);
      }
      
      return () => {
        document.removeEventListener('scroll',mostrarScroll);
      }

      
    },[]);
    
  if(tipo===1) {
    return(

      <div className={'simple-text_info'}>
        <h1>{titulo}</h1>

        {texto}
      </div>
    );

  }else if(tipo===2) {
    
    return(

    
      <div ref={ref} className={ 'simple-text_info fxElement' }>
        <h3>{titulo}</h3>

        {texto}
      </div>
    );
  };


};


SimpleText.propTypes = {
    
  titulo: PropTypes.string,
  tipo: PropTypes.number.isRequired, //1: contiene un h1 y 2: contiene un h3
  
}
SimpleText.defaultProps = {

  tipo: 2,

}