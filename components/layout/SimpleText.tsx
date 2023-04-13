
import React, {useRef, useEffect} from 'react';


interface Props {
  titulo: string
  texto: any
  tipo: number
}


export function SimpleText({titulo,texto,tipo}: Props) {

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
  } else {
    return <></>
  }


};