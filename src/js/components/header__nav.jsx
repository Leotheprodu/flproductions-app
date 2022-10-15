import propTypes from 'prop-types'
import { BlogRender } from '../pages/blog';
import { ContactoRender } from '../pages/contacto';
import { InicioRender } from '../pages/inicio';
import { NosotrosRender } from '../pages/nosotros';
import { ServiciosRender } from '../pages/servicios';


export function NavMenu({pagina}) {

  function inicio() {
    if(pagina ==='inicio') {

      return "nav_menu-active"
    }
  }
  function nosotros() {
    if(pagina ==='nosotros') {

      return "nav_menu-active"
    }
  }
  function blog() {
    if(pagina ==='blog') {

      return "nav_menu-active"
    }
  }
  function contacto() {
    if(pagina ==='contacto') {

      return "nav_menu-active"
    }
  }
  function servicios() {
    if(pagina ==='servicios') {

      return "nav_menu-active"
    }
  }

  return(

    <div className='header__nav'>

      <a href="#" onClick={InicioRender} className='header__web-tittle'>FLProductions</a>

      <nav>

        <a onClick={InicioRender} className={inicio()} href="#">Inicio</a>
        <a onClick={NosotrosRender} className={nosotros()} href="#">Nosotros</a>
        <a onClick={BlogRender} className={blog()} href="#">Blog</a>
        <a onClick={ContactoRender} className={contacto()} href="#">Contacto</a>
        <a onClick={ServiciosRender} className={servicios()} href="#">Servicios</a>
        

      </nav>
      

    </div>


  )


}


NavMenu.propTypes = {
    
  pagina: propTypes.string.isRequired,
  
}