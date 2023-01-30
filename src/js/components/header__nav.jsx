import { NavLink, Link } from 'react-router-dom';



export function NavMenu() {


  return(

          <div className='header__nav'>

            <Link to="/" className='header__web-tittle'>FLProductions</Link>

            <nav className='header__links'>
              <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
              <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
              <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
              <NavLink to='/musica' className='header__links__link'>Musica</NavLink>
              {/* 
              <NavLink to='/servicios' className='header__links__link'>Servicios</NavLink> */}

            </nav>
            

          </div>

  

  )

}