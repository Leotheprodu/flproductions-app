import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';



export function NavMenu() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return(

          <div className='header__nav'>

            <Link to="/" className='header__web-tittle'>{!data ? "FLP" : data}</Link>

            <nav className='header__links'>
              <NavLink to='/' end className='header__links__link'>Inicio</NavLink>
              <NavLink to='/nosotros' className='header__links__link'>Nosotros</NavLink>
              <NavLink to='/contacto' className='header__links__link'>Contacto</NavLink>
              {/* <NavLink to='/blog' className='header__links__link'>Blog</NavLink>
              <NavLink to='/servicios' className='header__links__link'>Servicios</NavLink> */}

            </nav>
            

          </div>

  

  )

}