import PropTypes from 'prop-types'

export function Header ({imgLink, pagina}) {

  return (

    <div className={"header"+" "+pagina+"-contenedor"}>

      <div>
        
        <picture>

          <img className={pagina+"-img"} style={{ backgroundImage:`url(${imgLink})` }} loading="lazy" />
        </picture>

      </div>


    </div>

  )

}
Header.propTypes = {
    
  pagina: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  
}
Header.defaultProps = {

  imgLink: "https://flproductionscr.com/build_main/img/header-main.png",
  pagina: "default",

}