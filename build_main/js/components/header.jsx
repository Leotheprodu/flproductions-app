import PropTypes from 'prop-types'

export function Header ({imgName, pagina}) {

  return (

    <div className={"header"+" "+pagina+"-contenedor"}>

      <div>
        
        <picture>

          <img className={pagina+"-img"} style={{ backgroundImage:`url(${"build_main/img/"+imgName})` }} loading="lazy" />
        </picture>

      </div>


    </div>

  )

}
Header.propTypes = {
    
  pagina: PropTypes.string.isRequired,
  imgName: PropTypes.string.isRequired,
  
}
Header.defaultProps = {

  imgName: "header-main",
  pagina: "default",

}