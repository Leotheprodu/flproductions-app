import PropTypes from 'prop-types'

export function PalabrasDelEquipo({titulo, texto, nombre, puesto, foto, firma}) {

    return(
      <div className='palabras-del-equipo'>
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