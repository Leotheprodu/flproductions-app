import { SocialIcons } from "./social-icons"
import { NavMenu } from "./header__nav";
import propTypes from 'prop-types'

export function Header ({imgName, pagina}) {

  return (

    <div className="header">

      <NavMenu pagina={pagina}/>

      <div>
        <picture>
          <source srcSet={"build/img/"+imgName+".avif"} type="image/avif" />
          <source srcSet={"build/img/"+imgName+".webp"} type="mage/webp" />
          <img className="header-img" src={"build/img/"+imgName+".png"} alt={imgName} loading="lazy" width={200} height={300} />

        </picture>

        <div className="header__socialIcons">

        <SocialIcons claseCSS='header__socialIcons__icons' />

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

  imgName: "header-main"

}