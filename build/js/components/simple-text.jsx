import propTypes from 'prop-types'


export function SimpleText({titulo,texto,cssClass}) {

    return(

    
      <div className={cssClass}>
        <h1>{titulo}</h1>

        <p>{texto}</p>
      </div>
    )
}


SimpleText.propTypes = {
    
  titulo: propTypes.string.isRequired,
  texto: propTypes.string.isRequired,
  cssClass: propTypes.string,
  
}
SimpleText.defaultProps = {

  cssClass: "simple-text_info",

}