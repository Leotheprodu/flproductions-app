import { NavLink, Link } from 'react-router-dom';
import { SocialIcons } from './social-icons';



export function NavMenu() {


  return(

          <div className='header__nav'>
            <div>
              <Link to="/" className='header__web-tittle'>FLProductions</Link>
              <div className='root-socialIcons'>
                <SocialIcons 
                  size={20}
                  facebook = 'https://www.facebook.com/FLProductionscr'
                  youtube='https://www.youtube.com/channel/UCAVKw7wP-yKPGSbCd1BJ7mw'
                  instagram='https://www.instagram.com/leotheprodu/'
                  twitch='https://www.twitch.tv/leotheprodu'
                />
              </div>

            </div>

            <nav className='header__links'>
              <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
              <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
              <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
                <NavLink to='/musica' className='header__links__link'>Musica</NavLink>
              {/* <div className='header__submenu-parent'>
                
                  <nav className='header__submenu'>
                    <NavLink to='/generos' className='header__links__link'>Generos</NavLink>
                    <NavLink to='/artistas' className='header__links__link'>Artistas</NavLink>
                  </nav>
                
              </div> */}
            </nav>
            

          </div>

  

  )

}