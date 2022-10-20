import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom';


export function NavMenu() {

  return(

          <div className='header__nav'>

            <a href="/" className='header__web-tittle'>FLProductions</a>

            <nav className='header__links'>
              <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
              <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
              <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
              <NavLink to='/blog' className='header__links__link'>Blog</NavLink>
              <NavLink to='/servicios' className='header__links__link'>Servicio</NavLink>

            </nav>
            

          </div>

  

  )

}