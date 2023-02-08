import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';



export function NavMenu() {
  const [submenuOpen, setSubmenuOpen] = useState(false);


  return(

          <div className='header__nav'>

            <Link to="/" className='header__web-tittle'>FLProductions</Link>

            <nav className='header__links'>
              <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
              <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
              <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
              <div className='header__submenu-parent'>
                <NavLink to='/musica' className='header__links__link'>Musica</NavLink>
                
                  <nav className='header__submenu'>
                    <NavLink to='/generos' className='header__links__link'>Generos</NavLink>
                    <NavLink to='/artistas' className='header__links__link'>Artistas</NavLink>
                  </nav>
                
              </div>
            </nav>
            

          </div>

  

  )

}