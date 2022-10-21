import propTypes from 'prop-types'

export function Header ({imgName, pagina}) {

  return (

    <div className={"header"+" "+pagina+"-contenedor"}>

      <div>
        
        <picture>

          <img className={pagina+"-img"} style={{ backgroundImage:`url(${"build/img/"+imgName})` }} loading="lazy" />
        </picture>

      </div>


    </div>

  )

}
Header.propTypes = {
    
  pagina: propTypes.string.isRequired,
  imgName: propTypes.string.isRequired,
  
}
Header.defaultProps = {

  imgName: "header-main",
  pagina: "default",

}