import propTypes from 'prop-types'


export function SimpleText({titulo,texto,cssClass,tipo}) {
  if(tipo===1) {
    return(

      <div className={cssClass}>
        <h1>{titulo}</h1>

        <p>{texto}</p>
      </div>
    );
    
  }else if(tipo===2) {
    
    return(

    
      <div className={cssClass}>
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
  cssClass: propTypes.string,
  
}
SimpleText.defaultProps = {

  cssClass: "simple-text_info",
  tipo: 2,

}