import { IconUser, IconMenu2 } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SessionPanel from './usuarios/SessionPanel';
import { useSelector } from 'react-redux';

export function NavMenu() {
  const [UserButton, setUserButton] = useState(false);
  const [isMovilUser, setIsMovilUser] = useState(false);
  const [onClickMovilUser, setOnClickMovilUser] = useState(false);
  const isLoggedIn = useSelector(state => state.user.session.isLoggedIn);

  const handleClick = () => {
    setUserButton(!UserButton);
  };
  const handleClickMovilUser = () => {
    setOnClickMovilUser(!onClickMovilUser)


  }
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMovilUser(true);
    } else {
      setIsMovilUser(false);
    }
  }, [])



  return (

    <div className='header__nav'>
      <div className='header__nav__titulo-links'>
        <Link to="/" className='header__web-tittle'>FLProductions</Link>


      </div>

      <div className='header__nav_boton_usuarios'>
        <div title='Opciones de Sesión' onClick={handleClick} className='header__nav_boton'>
          <IconUser size={20} />

        </div>
        {
          isLoggedIn &&
          <div className={`header__nav_boton_usuarios_login ${UserButton ? "selected" : ""}`}>
            <SessionPanel />
          
          </div>
        }
        {
          !isLoggedIn &&
          <div className={`header__nav_boton_usuarios_login ${UserButton ? "selected" : ""}`}>
            <SessionPanel />
          
          </div>
        }
        
      </div>
      {
        !isMovilUser &&
          <nav className='header__links'>
            <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
            <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
            <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
            <div className='header__submenu-parent'>
              
              <p className='header__links__link__musica'>Musica</p>

              <nav className='header__submenu'>
                <NavLink to='/canciones' className='header__links__link'>Canciones</NavLink>
                <NavLink to='/instrumentales' className='header__links__link'>Instrumentales</NavLink>
              </nav>

            </div>
          </nav>


      }

      {
        isMovilUser &&
        <div className='menu_celular'>
          <button onClick={handleClickMovilUser}><IconMenu2/></button> 
        </div>
      }

      {
        onClickMovilUser &&
        <nav className='header__links__movil'>
            <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
            <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
            <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
            <NavLink to='/canciones' className='header__links__link'>Canciones</NavLink>
            <NavLink to='/instrumentales' className='header__links__link'>Instrumentales</NavLink>
              
          </nav>
      }


    </div>



  )

}

