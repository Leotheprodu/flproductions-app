import { SocialIcons } from "./social-icons"
import { NavMenu } from "./header__nav";
import propTypes from 'prop-types'

export function Header ({imgName, pagina}) {

  return (

    <div className={"header"+" "+pagina+"-contenedor"}>

      <NavMenu />

      <div>
        
        <picture>

          <img className={pagina+"-img"} style={{ backgroundImage:`url(${"build/img/"+imgName})` }} loading="lazy" />
        </picture>
        
        <div className="header__socialIcons">

          <SocialIcons size={24} />

        </div>

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