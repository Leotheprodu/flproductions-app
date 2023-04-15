
import { IconUser, IconMenu2 } from '@tabler/icons';
import { useState, useEffect } from 'react';
import SessionPanel from '../users/SessionPanel';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import NavLink from '../helpers/NavLink';
import Link from 'next/link';

export function Header() {
  const [UserButton, setUserButton] = useState<boolean>(false);
  const [isMovilUser, setIsMovilUser] = useState<boolean>(false);
  const [onClickMovilUser, setOnClickMovilUser] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.session.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.session.user);
  const [mainMensaje, setMainMensaje] = useState<string>('');
  

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

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_USER_GENERAL_MESSAGES : process.env.NEXT_PUBLIC_DEV_USER_GENERAL_MESSAGES}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
            
                  const mensaje_General_Todos = data.filter((item) => item.tipo_de_mensaje === "mainTop" && item.id_role === 8 ) ;

                  setMainMensaje(mensaje_General_Todos[0].mensaje);
                  
                  if(isLoggedIn) {
                    setMainMensaje('');

                  }

                }else{
                  setMainMensaje('');
              }


            })
            .catch((error) => {
                console.log(error);
            })
  }, [isLoggedIn])
  



  return (
    <div className='contenedor__header__nav'>
      <div className='header__nav__top-main-message'><p>{mainMensaje}</p></div>
      <div className='header__nav'>
        <div className='header__nav__titulo-links'>
          <Link tabIndex={-1} href="/" className='header__web-tittle'>FLProductions</Link>


        </div>

        <div className='header__nav_boton_usuarios' >
          <div title='Opciones de Sesión' onClick={handleClick} className='header__nav_boton'>
            <div style={{ opacity: '1' }}>
              {
                <IconUser size={20} />

              }
            </div>



          </div>

          <div className={`header__nav_boton_usuarios_login ${UserButton ? "selected" : ""}`}>
            <SessionPanel />

          </div>

        </div>
        {
          !isMovilUser &&
          <nav className='header__links'>
            <NavLink href='/' className='header__links__link'>Inicio</NavLink>
            <NavLink href='/nosotros' className='header__links__link'>Nosotros</NavLink>
            <NavLink href='/contacto' className='header__links__link'>Contacto</NavLink>
            <div className='header__submenu-parent'>

              <p className='header__links__link__musica'>Musica</p>

              <nav className='header__submenu'>
                <NavLink href='/canciones' className='header__links__link'>Canciones</NavLink>
                <NavLink href='/instrumentales' className='header__links__link'>Instrumentales</NavLink>
              </nav>

            </div>
          </nav>


        }

        {
          isMovilUser &&
          <div className='menu_celular'>
            <button onClick={handleClickMovilUser}><IconMenu2 /></button>
          </div>
        }



        <nav className={`header__links__movil ${onClickMovilUser ? 'selected' : ''}`}>
          <NavLink href='/' className='header__links__link'>Inicio</NavLink>
          <NavLink href='/nosotros' className='header__links__link'>Nosotros</NavLink>
          <NavLink href='/contacto' className='header__links__link'>Contacto</NavLink>
          <NavLink href='/canciones' className='header__links__link'>Canciones</NavLink>
          <NavLink href='/instrumentales' className='header__links__link'>Instrumentales</NavLink>

        </nav>



      </div>
    </div>



  )

}

