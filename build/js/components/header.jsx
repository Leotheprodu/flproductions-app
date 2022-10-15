import { SocialIcons } from "./social-icons"
import { NavMenu } from "./header__nav";
import propTypes from 'prop-types'

export function Header ({imgName, pagina}) {

  return (

    <div className={"header"+" "+pagina+"-contenedor"}>

      <NavMenu pagina={pagina}/>

      <div className="header__contenedor-imagen">
        
        <picture className="header__contenedor__picture">
          {/* <source srcSet={"build/img/"+imgName+".avif"} type="image/avif" />
          <source srcSet={"build/img/"+imgName+".webp"} type="image/webp" />
          <source srcSet={"build/img/"+imgName+".png"} type="image/png" /> */}
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